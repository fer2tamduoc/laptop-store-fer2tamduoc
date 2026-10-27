import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import cartApi from '../api/cartApi';
import { getErrorMessage, isCancel } from '../api/axiosClient';
import { getSellingPrice } from '../utils/format';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);
const validItems = (items) => items.filter((item) => item.laptop);

function getStockError(laptop) {
  return new Error(`Chỉ còn ${Number(laptop.stock) || 0} sản phẩm`);
}

function validateQuantity(quantity, laptop) {
  const stock = Number(laptop.stock) || 0;
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Số lượng phải là số nguyên lớn hơn 0');
  }
  if (stock <= 0) throw getStockError(laptop);
  if (quantity > stock) throw getStockError(laptop);
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id == null ? null : String(user.id);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedUserId, setLoadedUserId] = useState(null);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const itemsRef = useRef(items);

  const commitItems = useCallback((update) => {
    const nextItems = typeof update === 'function' ? update(itemsRef.current) : update;
    itemsRef.current = nextItems;
    setItems(nextItems);
  }, []);

  useEffect(() => {
    if (!userId) {
      let active = true;
      queueMicrotask(() => {
        if (!active) return;
        commitItems([]);
        setLoadedUserId(null);
        setError(null);
      });
      return () => {
        active = false;
      };
    }

    const controller = new AbortController();
    let active = true;

    async function loadCart() {
      setLoading(true);
      setError(null);
      try {
        const cartItems = await cartApi.getByUser(user.id, controller.signal);
        if (active) commitItems(validItems(cartItems));
      } catch (requestError) {
        if (active && !isCancel(requestError)) setError(getErrorMessage(requestError));
      } finally {
        if (active) {
          setLoading(false);
          setLoadedUserId(userId);
        }
      }
    }

    loadCart();
    return () => {
      active = false;
      controller.abort();
    };
  }, [user, userId, reloadKey, commitItems]);

  const addToCart = useCallback(async (laptop, quantity = 1) => {
    if (!user) throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ');
    if (loadedUserId !== userId) throw new Error('Giỏ hàng đang tải. Vui lòng thử lại.');
    if (error) throw new Error('Không thể tải giỏ hàng. Hãy thử tải lại trước khi thêm sản phẩm.');
    validateQuantity(quantity, laptop);

    const existing = itemsRef.current.find((item) => String(item.laptopId) === String(laptop.id));
    const nextQuantity = (Number(existing?.quantity) || 0) + quantity;
    if (nextQuantity > Number(laptop.stock)) throw getStockError(laptop);

    if (existing) {
      const updated = await cartApi.updateQuantity(existing.id, nextQuantity);
      commitItems((current) => current.map((item) => (
        item.id === existing.id ? { ...item, quantity: updated.quantity } : item
      )));
      return;
    }

    const created = await cartApi.add(user.id, laptop.id, quantity);
    commitItems((current) => {
      const duplicate = current.find((item) => String(item.laptopId) === String(laptop.id));
      if (duplicate) {
        return current.map((item) => (
          item.id === duplicate.id
            ? { ...item, quantity: Number(item.quantity) + quantity }
            : item
        ));
      }
      return [...current, { ...created, laptop }];
    });
  }, [user, userId, loadedUserId, error, commitItems]);

  const updateQuantity = useCallback(async (item, quantity) => {
    validateQuantity(quantity, item.laptop);
    const updated = await cartApi.updateQuantity(item.id, quantity);
    commitItems((current) => current.map((cartItem) => (
      cartItem.id === item.id ? { ...cartItem, quantity: updated.quantity } : cartItem
    )));
  }, [commitItems]);

  const removeItem = useCallback(async (item) => {
    const previousItems = itemsRef.current;
    const index = previousItems.findIndex((cartItem) => cartItem.id === item.id);
    commitItems((current) => current.filter((cartItem) => cartItem.id !== item.id));

    try {
      await cartApi.remove(item.id);
    } catch (requestError) {
      commitItems((current) => {
        if (current.some((cartItem) => cartItem.id === item.id)) return current;
        const restored = [...current];
        restored.splice(index < 0 ? restored.length : index, 0, item);
        return restored;
      });
      throw requestError;
    }
  }, [commitItems]);

  const clearLocal = useCallback(() => commitItems([]), [commitItems]);
  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  const isLoading = Boolean(userId) && (loading || loadedUserId !== userId);
  const value = useMemo(() => ({
    items: userId && loadedUserId === userId ? items : [],
    totalQuantity: (userId && loadedUserId === userId ? items : [])
      .reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    totalPrice: (userId && loadedUserId === userId ? items : []).reduce(
      (sum, item) => sum + getSellingPrice(item.laptop) * (Number(item.quantity) || 0),
      0,
    ),
    loading: isLoading,
    error: userId ? error : null,
    addToCart,
    updateQuantity,
    removeItem,
    clearLocal,
    reload,
  }), [
    items,
    userId,
    loadedUserId,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    clearLocal,
    reload,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
