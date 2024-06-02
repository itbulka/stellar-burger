import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  CONSTRUCTOR_SLICE_NAME,
  FEEDS_SLICE_NAME,
  INGREDIENTS_SLICE_NAME,
  ORDERS_SLICE_NAME,
  USER_SLICE_NAME
} from '../utils/constants';
import { reducer as constructorReducer } from './slices/burgerConstructor';
import { reducer as feedsReducer } from './slices/feeds';
import { reducer as ingredientsReducer } from './slices/ingredients';
import { reducer as ordersReducer } from './slices/orders';
import { reducer as userReducer } from './slices/user';

const rootReducer = combineReducers({
  [INGREDIENTS_SLICE_NAME]: ingredientsReducer,
  [USER_SLICE_NAME]: userReducer,
  [CONSTRUCTOR_SLICE_NAME]: constructorReducer,
  [ORDERS_SLICE_NAME]: ordersReducer,
  [FEEDS_SLICE_NAME]: feedsReducer
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
