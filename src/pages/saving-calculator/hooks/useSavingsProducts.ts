import { useEffect, useState } from 'react';
import { getSavingsProducts } from '../../../apis/getSavingsProducts';
import type { SavingsProduct } from '../../../savings';

export const useSavingsProducts = () => {
  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        const response = await getSavingsProducts();
        if (!cancelled) {
          setProducts(response);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : '상품 목록을 불러오지 못했어요. 새로고침 후 다시 시도해주세요.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, isLoading, error };
};
