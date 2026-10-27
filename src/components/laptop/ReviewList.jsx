import { ListGroup } from 'react-bootstrap';
import StarRating from '../common/StarRating';
import { formatDate } from '../../utils/format';

export default function ReviewList({ reviews }) {
  if (!reviews?.length) {
    return <p className="text-secondary py-3">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>;
  }

  const newestFirst = [...reviews].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );

  return (
    <ListGroup variant="flush">
      {newestFirst.map((review) => (
        <ListGroup.Item key={review.id} className="px-0">
          <div className="d-flex justify-content-between flex-wrap">
            <strong>{review.userName || 'Khách hàng'}</strong>
            <small className="text-secondary">{formatDate(review.createdAt)}</small>
          </div>
          <StarRating value={review.rating} showValue={false} />
          <p className="mb-0 mt-1">{review.comment}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
