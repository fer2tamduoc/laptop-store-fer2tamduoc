import { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import laptopApi from '../../api/laptopApi';
import { isCancel } from '../../api/axiosClient';
import useDebounce from '../../hooks/useDebounce';
import { formatPrice, getSellingPrice } from '../../utils/format';

export default function SearchSuggest({ onNavigate }) {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const requestRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const debouncedKeyword = useDebounce(keyword.trim(), 400);

  useEffect(() => {
    if (!debouncedKeyword) return undefined;

    const controller = new AbortController();
    requestRef.current = controller;
    let active = true;

    async function fetchSuggestions() {
      setLoading(true);
      setError(null);
      try {
        const { items } = await laptopApi.getAll(
          { q: debouncedKeyword, _limit: 5 },
          controller.signal,
        );
        if (active) setSuggestions(items);
      } catch (requestError) {
        if (!isCancel(requestError) && active) {
          setSuggestions([]);
          setError('Không thể tải gợi ý. Vui lòng thử lại.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchSuggestions();
    return () => {
      active = false;
      controller.abort();
      if (requestRef.current === controller) requestRef.current = null;
    };
  }, [debouncedKeyword]);

  useEffect(() => {
    if (!open) return undefined;

    function closeOnOutsidePointer(event) {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [open]);

  function navigateTo(path) {
    requestRef.current?.abort();
    setOpen(false);
    setKeyword('');
    setSuggestions([]);
    setError(null);
    onNavigate?.();
    navigate(path);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const query = keyword.trim();
    if (query) navigateTo(`/laptops?q=${encodeURIComponent(query)}`);
  }

  const showResults = open && keyword.trim() !== '' && debouncedKeyword === keyword.trim();

  return (
    <Form
      ref={wrapperRef}
      className="position-relative my-2 my-lg-0"
      onSubmit={handleSubmit}
      role="search"
    >
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Tìm laptop..."
          aria-label="Tìm laptop"
          aria-expanded={showResults}
          aria-controls="navbar-search-suggestions"
          value={keyword}
          onChange={(event) => {
            requestRef.current?.abort();
            setKeyword(event.target.value);
            setSuggestions([]);
            setError(null);
            setLoading(false);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false);
          }}
        />
        <Button type="submit" variant="warning">
          Tìm
        </Button>
      </InputGroup>

      {showResults && (
        <ListGroup
          id="navbar-search-suggestions"
          className="position-absolute w-100 shadow search-suggest-list"
          aria-label="Gợi ý laptop"
        >
          {loading && (
            <ListGroup.Item className="text-secondary small" role="status">
              <Spinner size="sm" className="me-2" />
              Đang tìm...
            </ListGroup.Item>
          )}
          {error && <ListGroup.Item className="text-danger small">{error}</ListGroup.Item>}
          {!loading && !error && suggestions.length === 0 && (
            <ListGroup.Item className="text-secondary small">Không có kết quả</ListGroup.Item>
          )}
          {!loading &&
            !error &&
            suggestions.map((laptop) => (
              <ListGroup.Item
                key={laptop.id}
                action
                as="button"
                type="button"
                className="d-flex justify-content-between gap-2 text-start"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => navigateTo(`/laptops/${laptop.id}`)}
              >
                <span className="text-truncate">{laptop.name}</span>
                <span className="text-danger fw-semibold text-nowrap">
                  {formatPrice(getSellingPrice(laptop))}
                </span>
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </Form>
  );
}
