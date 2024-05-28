import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { USER_SLICE_NAME } from '../../utils/constants';
import { getUser, loginUser, registerUser, updateUser } from '../thunk/user';

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  requestStatus: RequestStatus;
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  requestStatus: RequestStatus.Idle
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(getUser.pending, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.pending, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.rejected, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    getUserSelector: (state) => state.user,
    getStatusSelector: (state) => state.requestStatus,
    getAuthCheckedSelector: (state) => state.isAuthChecked
  }
});

export const reducer = userSlice.reducer;
export const { getUserSelector, getStatusSelector, getAuthCheckedSelector } =
  userSlice.selectors;
