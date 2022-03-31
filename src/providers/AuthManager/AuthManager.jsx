import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { logout } from '../../redux/store';

export const AuthManager = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token && pathname === '/') {
      navigate('/dashboard');
    }
  }, []);

  useEffect(() => {
    if (token && token.exp * 1000 < Date.now()) {
      dispatch(logout());
    }
  }, [pathname]);

  return children;
};

export default AuthManager;
export { default as RequireAuth } from './RequireAuth';

AuthManager.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
