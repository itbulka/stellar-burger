import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';
import { removeIngredient } from '../../services/slices/burgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => console.log('Move down');

    const handleMoveUp = () => console.log('Move up');

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
