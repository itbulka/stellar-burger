import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { INGREDIENTS_SLICE_NAME, USER_SLICE_NAME } from '../utils/constants';
import {
  reducer as reducerIngredients,
  reducer as reducerUser
} from './slices/ingredients';

const rootReducer = combineReducers({
  [INGREDIENTS_SLICE_NAME]: reducerIngredients,
  [USER_SLICE_NAME]: reducerUser
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
