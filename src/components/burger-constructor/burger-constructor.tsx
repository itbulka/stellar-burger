import { BurgerConstructorUI } from '@ui';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConstructorItems } from '../../services/slices/burgerConstructor';
import {
  clearOrderModal,
  getOrderModalSelector,
  getStatusSelector
} from '../../services/slices/orders';
import { getUserSelector } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';
import { postOrder } from '../../services/thunk/orders';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const statusRequest = useSelector(getStatusSelector);
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = statusRequest === RequestStatus.Loading;

  const orderModalData = useSelector(getOrderModalSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true });
    } else {
      const orders = [];
      orders.push(constructorItems.bun._id);
      constructorItems.ingredients.forEach((ingredient) =>
        orders.push(ingredient._id)
      );
      orders.push(constructorItems.bun._id);
      dispatch(postOrder(orders));
    }
  };
  const closeOrderModal = () => dispatch(clearOrderModal());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
