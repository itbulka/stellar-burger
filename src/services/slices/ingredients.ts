import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../thunk/ingredients';

type ingredientsState = {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ingredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getBunsSelector: (state) => state.buns,
    getMainsSelector: (state) => state.mains,
    getSaucesSelector: (state) => state.sauces,
    getIngredientLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        action.payload.forEach((item) => {
          if (item.type === 'bun') state.buns.push(item);
          if (item.type === 'sauce') state.sauces.push(item);
          if (item.type === 'main') state.mains.push(item);
        });
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла неизвестная ошибка';
      });
  }
});

export const {
  getBunsSelector,
  getMainsSelector,
  getSaucesSelector,
  getIngredientLoading
} = ingredientSlice.selectors;
export const reducer = ingredientSlice.reducer;
