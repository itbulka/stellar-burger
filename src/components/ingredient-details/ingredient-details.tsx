import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { getIngredientsSelector } from '../../services/slices/ingredients';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientId = useParams();
  const ingredientData = useSelector(getIngredientsSelector).find(
    (ingredient) => ingredient._id === ingredientId.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
