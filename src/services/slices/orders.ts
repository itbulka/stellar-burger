import { createSlice } from '@reduxjs/toolkit';
import { ORDERS_SLICE_NAME } from '../../utils/constants';
import { RequestStatus, TOrder } from '../../utils/types';
import { getOrders } from '../thunk/orders';

type OrdersState = {
  orders: TOrder[];
  status: RequestStatus;
};

const initialState: OrdersState = {
  orders: [],
  status: RequestStatus.Idle
};

const ordersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getStatusSelector: (state) => state.status
  }
});

export const reducer = ordersSlice.reducer;
export const { getOrdersSelector, getStatusSelector } = ordersSlice.selectors;
