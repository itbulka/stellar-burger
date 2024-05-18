import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '../../utils/burger-api';
import { USER_SLICE_NAME } from '../../utils/constants';
import { setCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async () => getUserApi()
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (data: TRegisterData) => {
    const payload = await registerUserApi(data);
    setCookie('accessToken', payload.accessToken);
    setCookie('refreshToken', payload.refreshToken);
    return payload.user;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (data: TRegisterData) => {
    const payload = await loginUserApi(data);
    setCookie('accessToken', payload.accessToken);
    setCookie('refreshToken', payload.refreshToken);
    return payload.user;
  }
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  async () => {
    const success = await logoutApi();
    if (success) {
      setCookie('accessToken', '');
      setCookie('refreshToken', '');
      localStorage.clear(); // Под вопросом
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  `${USER_SLICE_NAME}/resetPassword`,
  async (data: { password: string; token: string }) => {
    const success = await resetPasswordApi(data);
  }
);

export const forgotPasswordUser = createAsyncThunk(
  `${USER_SLICE_NAME}/forgotPassword`,
  async (data: { email: string }) => {
    const success = await forgotPasswordApi(data);
  }
);
