import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);

export const postOrder = createAsyncThunk(
  'orders/postOrder',
  async (data: string[]) => orderBurgerApi(data)
);
