import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getAuthCheckedSelector,
  getUserSelector
} from '../../services/slices/user';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getAuthCheckedSelector);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.state || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  if (!onlyUnAuth && !user) {
    console.log(`Location -> ${location}`);
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: location,
          backgroundLocation: location.state?.backgroundLocation
        }}
      />
    );
  }

  return children;
};
