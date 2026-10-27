import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Form, InputGroup, Offcanvas, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import catalogApi from '../api/catalogApi';
import laptopApi, { buildLaptopParams, PAGE_SIZE, SORT_OPTIONS } from '../api/laptopApi';
import AppPagination from '../components/common/AppPagination';
import ErrorAlert from '../components/common/ErrorAlert';
import LaptopFilter from '../components/laptop/LaptopFilter';
import LaptopGrid from '../components/laptop/LaptopGrid';
import useAxios from '../hooks/useAxios';
import usePageTitle from '../hooks/usePageTitle';

const FILTER_KEYS = ['brandId', 'categoryId', 'priceMin', 'priceMax', 'ramMin', 'sort', 'q', 'page'];

export default function LaptopListPage() {
  usePageTitle('Danh sách laptop');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const searchTimer = useRef(null);
  const queryString = searchParams.toString();
  const filters = useMemo(
    () => Object.fromEntries(FILTER_KEYS.map((key) => [key, searchParams.get(key) || ''])),
    [searchParams],
  );
  const page = Math.max(1, Number.parseInt(filters.page, 10) || 1);
  const sort = SORT_OPTIONS[filters.sort] ? filters.sort : 'newest';

  const updateParams = useCallback((patch, { resetPage = true } = {}) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) next.delete(key);
      else next.set(key, String(value));
    });
    if (resetPage) next.delete('page');
    setSearchParams(next);
    setShowFilter(false);
  }, [searchParams, setSearchParams]);

  const updateSearch = useCallback((value) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set('q', value);
      else next.delete('q');
      next.delete('page');
      return next;
    });
  }, [setSearchParams]);

  const catalog = useAxios(async (signal) => {
    const [brands, categories] = await Promise.all([
      catalogApi.getBrands(signal),
      catalogApi.getCategories(signal),
    ]);
    return { brands, categories };
  }, []);

  const { data, loading, error, refetch } = useAxios(
    (signal) => laptopApi.getAll(buildLaptopParams({ ...filters, sort }), signal),
    [queryString],
  );
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  useEffect(() => {
    window.clearTimeout(searchTimer.current);
    // URL navigation (including Back/Forward) is the source of truth for the search input.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeyword(filters.q);
    return () => window.clearTimeout(searchTimer.current);
  }, [filters.q]);

  function handleKeywordChange(value) {
    setKeyword(value);
    window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => updateSearch(value.trim()), 500);
  }

  const filterProps = {
    brands: catalog.data?.brands,
    categories: catalog.data?.categories,
    filters,
    onChange: (patch) => updateParams(patch),
    onReset: () => {
      setKeyword('');
      setSearchParams({});
      setShowFilter(false);
    },
  };

  return (
    <main className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 className="h3 fw-bold mb-0">Laptop</h1>
        {data && <span className="text-secondary">Tìm thấy {data.total} laptop</span>}
      </div>

      {catalog.error && <ErrorAlert message={catalog.error} onRetry={catalog.refetch} />}

      <Row>
        <Col lg={3} className="d-none d-lg-block">
          <div className="bg-white rounded shadow-sm p-3 sticky-lg-top filter-sticky">
            <LaptopFilter {...filterProps} idPrefix="side" />
          </div>
        </Col>

        <Col lg={9}>
          <Row className="g-2 mb-3">
            <Col xs={12} md>
              <InputGroup>
                <InputGroup.Text aria-hidden="true">⌕</InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Tìm theo tên, CPU, card đồ họa..."
                  aria-label="Tìm trong danh sách"
                  value={keyword}
                  onChange={(event) => handleKeywordChange(event.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={6} md="auto">
              <Form.Select
                aria-label="Sắp xếp"
                value={sort}
                onChange={(event) => updateParams({ sort: event.target.value === 'newest' ? '' : event.target.value })}
              >
                {Object.entries(SORT_OPTIONS).map(([value, option]) => (
                  <option key={value} value={value}>{option.label}</option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={6} md="auto" className="d-lg-none">
              <Button variant="outline-dark" className="w-100" onClick={() => setShowFilter(true)}>
                Bộ lọc
              </Button>
            </Col>
          </Row>

          {error ? (
            <ErrorAlert message={error} onRetry={refetch} />
          ) : (
            <LaptopGrid laptops={data?.items} loading={loading} />
          )}

          {!loading && !error && (
            <AppPagination
              page={page}
              totalPages={totalPages}
              onChange={(nextPage) => updateParams({ page: nextPage === 1 ? '' : nextPage }, { resetPage: false })}
            />
          )}
        </Col>
      </Row>

      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Bộ lọc laptop</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LaptopFilter {...filterProps} idPrefix="mobile" />
        </Offcanvas.Body>
      </Offcanvas>
    </main>
  );
}
