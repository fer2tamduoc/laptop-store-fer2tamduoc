import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../api/axiosClient';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

export default function useAddToCart() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [adding, setAdding] = useState(false);

  async function add(laptop, quantity = 1) {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    setAdding(true);
    try {
      await addToCart(laptop, quantity);
      showToast(`Đã thêm "${laptop.name}" vào giỏ hàng`);
    } catch (error) {
      showToast(getErrorMessage(error), 'danger');
    } finally {
      setAdding(false);
    }
  }

  return { add, adding };
}
