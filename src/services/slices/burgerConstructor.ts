import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CONSTRUCTOR_SLICE_NAME } from '../../utils/constants';
import {
  RequestStatus,
  TConstructorIngredient,
  TIngredient
} from '../../utils/types';

type BurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  status: RequestStatus;
};

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  status: RequestStatus.Idle
};

const burgerConstructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients?.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: window.crypto.randomUUID() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      console.log(action.payload, index);
      state.constructorItems.ingredients.splice(index, 1);
    }
  },
  selectors: {
    getConstructorItems: (state: BurgerConstructorState) =>
      state.constructorItems
  }
});

export const { addIngredients, removeIngredient } =
  burgerConstructorSlice.actions;
export const reducer = burgerConstructorSlice.reducer;
export const { getConstructorItems } = burgerConstructorSlice.selectors;
