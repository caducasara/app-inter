import { api } from '../api';

export const request = async (value: number) => {
  const requestPix = await api.post(`/pix/request`, { value });

  return requestPix;
}

export const pay = async (key: string) => {
  const pixPay = await api.post(`/pix/pay/${key}`);

  return pixPay;
}

export const transaction = async () => {
  const transaction = await api.get(`/pix/transactions`);

  return transaction;
}