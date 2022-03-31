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
      this.namespace = 'https://fun-test-zpi.herokuapp.com/api/';
      this.post('Auth/login', () => {
        // tester
        return {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZWZhbkB3b3Jrc3BhY2UuY29tIiwidXNlcklkIjoiNGExNWUyZjctNTJkZC00ZTIyLWIwZjQtMjQxOTQ0MjE2Nzc1IiwibmFtZSI6Ik5vcmJlcnQiLCJzdXJuYW1lIjoiU3RlZmFuIiwicHJvZHVjdElkIjoiOTYzNDdlZTktOGY3My00OTM5LWFmMmUtMTIxMTJlN2U3NjFhIiwicHJvZHVjdE5hbWUiOiJQcm9kdWt0IzEiLCJyb2xlIjoiVGVzdGVyIiwiZXhwIjoyNjM2MzIwMzUwLCJpc3MiOiJGdW50ZXN0IiwiYXVkIjoiRnVudGVzdCJ9.-hHfCTVJgo_FG1gOQgeMqGDdec0VmEnlaNoKynEPLZg'
        };

        // developer
        // return {
        //   token:
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZWZhbkB3b3Jrc3BhY2UuY29tIiwidXNlcklkIjoiNGExNWUyZjctNTJkZC00ZTIyLWIwZjQtMjQxOTQ0MjE2Nzc1IiwibmFtZSI6Ik5vcmJlcnQiLCJzdXJuYW1lIjoiU3RlZmFuIiwicHJvZHVjdElkIjoiOTYzNDdlZTktOGY3My00OTM5LWFmMmUtMTIxMTJlN2U3NjFhIiwicHJvZHVjdE5hbWUiOiJQcm9kdWt0IzEiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiZXhwIjoyNjM2MzIwMzUwLCJpc3MiOiJGdW50ZXN0IiwiYXVkIjoiRnVudGVzdCJ9.xxInsV0kqM4hROoYCs3wqApbKpbhTWm7cCyhiNXcg0M'
        // };
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
