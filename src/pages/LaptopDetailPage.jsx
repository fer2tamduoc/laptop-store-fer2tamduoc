import { useState } from 'react';
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Image,
  InputGroup,
  Row,
  Tab,
  Table,
  Tabs,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '../api/axiosClient';
import laptopApi from '../api/laptopApi';
import reviewApi from '../api/reviewApi';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import ErrorAlert from '../components/common/ErrorAlert';
import Loading from '../components/common/Loading';
import Price from '../components/common/Price';
import StarRating from '../components/common/StarRating';
import LaptopGrid from '../components/laptop/LaptopGrid';
import ReviewForm from '../components/laptop/ReviewForm';
import ReviewList from '../components/laptop/ReviewList';
import useAxios from '../hooks/useAxios';
import usePageTitle from '../hooks/usePageTitle';
import NotFoundPage from './NotFoundPage';
import { handleImageError } from '../utils/image';

async function loadDetail(id, signal, userId) {
  const laptop = await laptopApi.getById(id, signal);

  const [reviewsResult, relatedResult, ownReviewResult] = await Promise.allSettled([
    reviewApi.getByLaptop(id, signal),
    laptopApi.getRelated(laptop, signal),
    userId ? reviewApi.findByUser(id, userId, signal) : Promise.resolve(null),
  ]);

  return {
    laptop,
    reviews: reviewsResult.status === 'fulfilled' ? reviewsResult.value : [],
    reviewsError: reviewsResult.status === 'rejected' ? getErrorMessage(reviewsResult.reason) : null,
    related: relatedResult.status === 'fulfilled' ? relatedResult.value : [],
    relatedError: relatedResult.status === 'rejected' ? getErrorMessage(relatedResult.reason) : null,
    ownReview: ownReviewResult.status === 'fulfilled' ? ownReviewResult.value : null,
    ownReviewError: ownReviewResult.status === 'rejected' ? getErrorMessage(ownReviewResult.reason) : null,
  };
}

function storageLabel(storage) {
  const value = Number(storage);
  return value >= 1024 ? `${value / 1024} TB` : `${value} GB`;
}

export default function LaptopDetailPage() {
  const { id } = useParams();

  if (!/^\d+$/.test(id || '')) return <NotFoundPage />;
  return <LaptopDetail key={id} id={id} />;
}

function LaptopDetail({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [cartNotice, setCartNotice] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const { data, loading, error, refetch, setData } = useAxios(
    (signal) => loadDetail(id, signal, user?.id),
    [id, user?.id],
  );
  const laptop = data?.laptop;
  usePageTitle(laptop?.name || 'Chi tiết laptop');

  async function handleReview({ rating, comment }) {
    if (!user || !laptop || !data) return false;
    setSubmittingReview(true);
    try {
      const existing = await reviewApi.findByUser(laptop.id, user.id);
      if (existing) {
        setData((current) => ({ ...current, ownReview: existing }));
        showToast('Bạn đã đánh giá sản phẩm này rồi', 'warning');
        return false;
      }

      const review = await reviewApi.create({
        laptopId: laptop.id,
        userId: user.id,
        userName: user.fullName || user.email || 'Khách hàng',
        rating,
        comment,
        createdAt: new Date().toISOString(),
      });

      const updatedReviews = [review, ...data.reviews];
      const averageRating = Math.round(
        (updatedReviews.reduce((sum, item) => sum + Number(item.rating), 0) / updatedReviews.length) * 10,
      ) / 10;

      setData((current) => ({
        ...current,
        reviews: [review, ...current.reviews],
        ownReview: review,
        laptop: { ...current.laptop, rating: averageRating },
      }));
      showToast('Cảm ơn bạn đã đánh giá!');

      try {
        await laptopApi.patch(laptop.id, { rating: averageRating });
      } catch (ratingError) {
        showToast(`Đánh giá đã được lưu nhưng chưa cập nhật được điểm trung bình: ${getErrorMessage(ratingError)}`, 'warning');
      }
      return true;
    } catch (reviewError) {
      showToast(getErrorMessage(reviewError), 'danger');
      return false;
    } finally {
      setSubmittingReview(false);
    }
  }

  if (loading) return <Loading text="Đang tải thông tin laptop..." />;
  if (error) {
    return (
      <>
        <ErrorAlert message={error} onRetry={refetch} />
        <Button variant="link" onClick={() => navigate('/laptops')}>
          ← Về danh sách laptop
        </Button>
      </>
    );
  }
  if (!laptop) return null;

  const outOfStock = Number(laptop.stock) <= 0;
  const maxQuantity = Math.max(1, Number(laptop.stock) || 1);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/laptops' }}>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/laptops' }}>Laptop</Breadcrumb.Item>
        <Breadcrumb.Item active>{laptop.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4 mb-4">
        <Col md={5}>
          <Image
            src={laptop.image || '/no-image.svg'}
            alt={laptop.name}
            fluid
            rounded
            className="border w-100 bg-white"
            onError={handleImageError}
          />
        </Col>
        <Col md={7}>
          <h1 className="h2 fw-bold">{laptop.name}</h1>
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {laptop.brand && (
              <Badge as={Link} to={`/laptops?brandId=${laptop.brandId}`} bg="dark" className="text-decoration-none">
                {laptop.brand.name}
              </Badge>
            )}
            {laptop.category && (
              <Badge as={Link} to={`/laptops?categoryId=${laptop.categoryId}`} bg="primary" className="text-decoration-none">
                {laptop.category.name}
              </Badge>
            )}
            <StarRating value={laptop.rating} />
            <span className="text-secondary small">· Đã bán {laptop.sold ?? 0}</span>
          </div>

          <div className="my-3"><Price laptop={laptop} size="lg" /></div>
          {laptop.description && <p>{laptop.description}</p>}
          <p>
            Tình trạng:{' '}
            {outOfStock
              ? <Badge bg="secondary">Hết hàng</Badge>
              : <Badge bg="success">Còn {laptop.stock} sản phẩm</Badge>}
          </p>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            <InputGroup style={{ width: 140 }}>
              <Button
                variant="outline-secondary"
                aria-label="Giảm số lượng"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                disabled={outOfStock || quantity <= 1}
              >
                −
              </Button>
              <InputGroup.Text className="flex-grow-1 justify-content-center" aria-label="Số lượng">
                {quantity}
              </InputGroup.Text>
              <Button
                variant="outline-secondary"
                aria-label="Tăng số lượng"
                onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
                disabled={outOfStock || quantity >= maxQuantity}
              >
                +
              </Button>
            </InputGroup>
            <Button
              size="lg"
              disabled={outOfStock}
              onClick={() => setCartNotice('Chức năng giỏ hàng sẽ được kết nối ở Issue 22.')}
            >
              🛒 Thêm vào giỏ
            </Button>
            <Button variant="outline-secondary" size="lg" onClick={() => navigate(-1)}>
              ← Quay lại
            </Button>
          </div>
          {cartNotice && <Alert className="mt-3 mb-0" variant="info">{cartNotice}</Alert>}
        </Col>
      </Row>

      <Tabs defaultActiveKey="specs" className="mb-3" id="laptop-tabs">
        <Tab eventKey="specs" title="Thông số kỹ thuật">
          <Table striped bordered responsive>
            <tbody>
              <tr><th scope="row" style={{ width: 200 }}>CPU</th><td>{laptop.cpu || '—'}</td></tr>
              <tr><th scope="row">RAM</th><td>{laptop.ram != null ? `${laptop.ram} GB` : '—'}</td></tr>
              <tr><th scope="row">Ổ cứng</th><td>{laptop.storage != null ? `SSD ${storageLabel(laptop.storage)}` : '—'}</td></tr>
              <tr><th scope="row">Màn hình</th><td>{laptop.screen || '—'}</td></tr>
              <tr><th scope="row">Card đồ họa</th><td>{laptop.gpu || '—'}</td></tr>
              <tr><th scope="row">Cân nặng</th><td>{laptop.weight ? `${laptop.weight} kg` : '—'}</td></tr>
              <tr><th scope="row">Hãng</th><td>{laptop.brand?.name || '—'}</td></tr>
              <tr><th scope="row">Loại</th><td>{laptop.category?.name || '—'}</td></tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="reviews" title={`Đánh giá (${data.reviews.length})`}>
          {data.reviewsError ? (
            <Alert variant="warning">
              Không tải được đánh giá. {data.reviewsError}
            </Alert>
          ) : (
            <>
              {user && data.ownReviewError && (
                <Alert variant="warning">
                  Không kiểm tra được trạng thái đánh giá của bạn. {data.ownReviewError}
                  <Button variant="link" className="p-0 ms-2" onClick={refetch}>Thử lại</Button>
                </Alert>
              )}
              {user && !data.ownReviewError && data.ownReview && (
                <Alert variant="info">Bạn đã đánh giá sản phẩm này rồi.</Alert>
              )}
              {user && !data.ownReviewError && !data.ownReview && (
                <ReviewForm onSubmit={handleReview} submitting={submittingReview} />
              )}
              {!user && (
                <Alert variant="info">
                  <Link to="/login" state={{ from: location }}>Đăng nhập</Link> để gửi đánh giá.
                </Alert>
              )}
              <ReviewList reviews={data.reviews} />
            </>
          )}
        </Tab>
      </Tabs>

      <section className="mt-5">
        <h2 className="h4 fw-bold mb-3">Laptop cùng loại</h2>
        {data.relatedError ? (
          <Alert variant="warning">Không tải được laptop liên quan. {data.relatedError}</Alert>
        ) : (
          <LaptopGrid laptops={data.related} loading={false} />
        )}
      </section>
    </>
  );
}
