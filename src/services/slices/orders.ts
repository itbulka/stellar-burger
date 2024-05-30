import { createSlice } from '@reduxjs/toolkit';
import { ORDERS_SLICE_NAME } from '../../utils/constants';
import { RequestStatus, TOrder } from '../../utils/types';
import { getOrders, postOrder } from '../thunk/orders';

type OrdersState = {
  orders: TOrder[];
  orderModal: TOrder | null;
  status: RequestStatus;
};

const initialState: OrdersState = {
  orders: [],
  orderModal: null,
  status: RequestStatus.Idle
};

const ordersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModal = null;
    }
  },
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
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderModal = action.payload.order;
        state.status = RequestStatus.Success;
      })
      .addCase(postOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderModal = null;
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getStatusSelector: (state) => state.status,
    getOrderModalSelector: (state) => state.orderModal
  }
});

export const { clearOrderModal } = ordersSlice.actions;
export const reducer = ordersSlice.reducer;
export const { getOrdersSelector, getStatusSelector, getOrderModalSelector } =
  ordersSlice.selectors;
