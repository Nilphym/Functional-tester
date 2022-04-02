import PropTypes from 'prop-types';
import { createServer } from 'miragejs';

import tests from './data/tests';
import bugs from './data/bugs';
import raports from './data/raports';
import testExecution from './data/testExecution';

// DOCS: https://miragejs.com/tutorial/part-1/
// Create new feature and add it to this list below
const features = [tests, bugs, raports, testExecution];

const makeModels = () => Object.assign(...features.map((feature) => feature.models));

const makeRoutes = (thisRef) => ({
  ...features.map((feature) => feature.routes.map((route) => route(thisRef)))
});

const makeSeeds = (serverRef) => ({
  ...features.map((feature) => feature.seeds.map((route) => route(serverRef)))
});

const makeServer = () =>
  createServer({
    models: makeModels(),
    routes() {
      this.urlPrefix = 'https://fun-test-zpi.herokuapp.com';
      this.namespace = '/api/';
      this.post('Auth/login', () => {
        return {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YTE1ZTJmNy01MmRkLTRlMjItYjBmNC0yNDE5NDQyMTY3NzUiLCJwcm9qZWN0SWQiOiI5NjM0N2VlOS04ZjczLTQ5MzktYWYyZS0xMjExMmU3ZTc2MWEiLCJwcm9qZWN0TmFtZSI6IlByb2R1a3QjMSIsIm5hbWUiOiJOb3JiZXJ0Iiwic3VybmFtZSI6IlN0ZWZhbiIsInJvbGUiOiJUZXN0ZXIiLCJleHAiOjI2MzYzMjAzNTB9.Y2OaBkdNlWh-GexJh3L7siQx0mdkOmhCgP5ic8rwY0Y'
        };
      });

      makeRoutes(this);
    },
    seeds(server) {
      makeSeeds(server);
    }
  });

export const MockServer = ({ children }) => {
  makeServer();
  return children;
};

export default MockServer;

MockServer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
