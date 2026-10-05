import { useEffect, useState } from 'react';
import { getSavingsProducts } from '../../../api/getSavingsProducts';
import type { SavingsProduct } from '../../../api/type/SavingsProduct';

export const useSavingsProductData = () => {
  const [products, setProducts] = useState<SavingsProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    setRequestVersion(version => version + 1);
  };

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
  }, [requestVersion]);

  return { products, isLoading, error, refetch };
};
