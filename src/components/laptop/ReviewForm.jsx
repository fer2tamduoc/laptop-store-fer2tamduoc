import { useState } from 'react';
import { Button, ButtonGroup, Card, Form, Spinner } from 'react-bootstrap';

export default function ReviewForm({ onSubmit, submitting }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [touched, setTouched] = useState(false);
  const validationError = comment.trim().length < 10
    ? 'Nội dung đánh giá phải có ít nhất 10 ký tự'
    : null;

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched(true);
    if (validationError || submitting) return;

    const submitted = await onSubmit({ rating, comment: comment.trim() });
    if (submitted) {
      setRating(5);
      setComment('');
      setTouched(false);
    }
  }

  return (
    <Card className="mb-3 bg-body-tertiary border-0">
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Label className="fw-semibold">Đánh giá của bạn</Form.Label>
          <div className="mb-2">
            <ButtonGroup aria-label="Chọn số sao">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  variant={star <= rating ? 'warning' : 'outline-warning'}
                  size="sm"
                  onClick={() => setRating(star)}
                  aria-label={`${star} sao`}
                  aria-pressed={star === rating}
                  disabled={submitting}
                >
                  ★
                </Button>
              ))}
            </ButtonGroup>
            <span className="ms-2 small text-secondary">{rating}/5</span>
          </div>
          <Form.Group controlId="review-comment">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              onBlur={() => setTouched(true)}
              isInvalid={touched && Boolean(validationError)}
              disabled={submitting}
              aria-describedby={touched && validationError ? 'review-comment-error' : undefined}
            />
            <Form.Control.Feedback id="review-comment-error" type="invalid">
              {validationError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="mt-2" disabled={submitting}>
            {submitting && <Spinner size="sm" className="me-2" />}
            Gửi đánh giá
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
