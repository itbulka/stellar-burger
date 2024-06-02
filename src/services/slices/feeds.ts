import { createSlice } from '@reduxjs/toolkit';
import { FEEDS_SLICE_NAME } from '../../utils/constants';
import { RequestStatus, TOrder } from '../../utils/types';
import { getFeeds } from '../thunk/feeds';

type FeedsState = {
  orders: TOrder[];
  feed: { total: number; totalToday: number };
  status: RequestStatus;
};

const initialState: FeedsState = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  status: RequestStatus.Idle
};

const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
        state.status = RequestStatus.Success;
      })
      .addCase(getFeeds.pending, (state, action) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    getFeedsSelector: (state) => state.orders,
    getStatusSelector: (state) => state.status,
    getFeedInfoSelector: (state) => state.feed
  }
});

export const reducer = feedsSlice.reducer;
export const { getFeedsSelector, getStatusSelector, getFeedInfoSelector } =
  feedsSlice.selectors;
