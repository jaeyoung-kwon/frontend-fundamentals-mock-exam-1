import { http, isHttpError } from 'tosslib';
import type { SavingsProduct } from '../savings';

export const getSavingsProducts = async () => {
  try {
    return await http.get<SavingsProduct[]>('/api/savings-products');
  } catch (error) {
    if (isHttpError(error)) {
      throw new Error(error.message);
    }
    throw new Error('상품 목록을 불러오지 못했어요. 새로고침 후 다시 시도해주세요.');
  }
};
