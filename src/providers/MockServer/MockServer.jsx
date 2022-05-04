import PropTypes from 'prop-types';
import { createServer } from 'miragejs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import UUIDManager from './UUIDManager';
import { logout } from '../../redux/store';
import { models, serializers, routes, seeds, factories } from './features';

const makeServer = () =>
  createServer({
    identityManagers: {
      application: UUIDManager
    },
    models,
    serializers,
    routes,
    seeds,
    factories
  });

export const MockServer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  makeServer();
  return children;
};

export default MockServer;

MockServer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
