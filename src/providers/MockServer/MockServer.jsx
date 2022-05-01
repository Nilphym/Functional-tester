import PropTypes from 'prop-types';
import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';

// import tests from './data/tests';
// import bugs from './data/bugs';
// import raports from './data/raports';
// import testExecution from './data/testExecution';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getRandomInt from '../../utils/getRandomInt';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import randomFromArray from '../../utils/randomFromArray';
import UUIDManager from './UUIDManager';
import decodeMirageJWT from '../../utils/decodeMirageJWT';
import { logout } from '../../redux/store';

const states = {
  new: 'New',
  open: 'Open',
  fixed: 'Fixed',
  retest: 'Retest',
  closed: 'Closed',
  rejected: 'Rejected',
  reopened: 'Reopened'
};
const impacts = ['Low', 'Medium', 'High'];
const priorities = ['Low', 'Medium', 'High'];
const types = ['Functional', 'Logic', 'Performance', 'Usability', 'Compatibility', 'Security'];
const roles = {
  developer: 'Developer',
  tester: 'Tester',
  projectManager: 'ProjectManager'
};
const defaultPassword = 'Password123!';

// const features = [tests, bugs, raports, testExecution];

// const makeModels = () => Object.assign(...features.map((feature) => feature.models));

// const makeRoutes = (thisRef) => ({
//   ...features.map((feature) => feature.routes.map((route) => route(thisRef)))
// });

// const makeSeeds = (serverRef) => ({
//   ...features.map((feature) => feature.seeds.map((route) => route(serverRef)))
// });

const makeServer = () =>
  createServer({
    // models: makeModels(),
    identityManagers: {
      application: UUIDManager
    },
    models: {
      project: Model.extend({
        bugs: hasMany(),
        users: hasMany()
      }),
      bug: Model.extend({
        project: belongsTo(),
        attachments: hasMany(),
        developer: belongsTo('user')
      }),
      attachment: Model.extend({
        bug: belongsTo()
      }),
      user: Model.extend({
        project: belongsTo(),
        bugs: hasMany()
      })
    },
    serializers: {
      bug: RestSerializer.extend({
        root: false,
        include: ['attachments', 'project', 'developer'],
        embed: true
      }),
      user: RestSerializer.extend({
        root: false,
        embed: true
      }),
      project: RestSerializer.extend({
        root: false,
        include: ['bugs', 'users'],
        embed: true
      }),
      attachment: RestSerializer.extend({
        root: false,
        embed: true
      })
    },
    routes() {
      this.urlPrefix = 'https://fun-test-zpi.herokuapp.com';
      this.namespace = '/api/';

      this.post('users/login', (schema, request) => {
        const { email } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ login: email });
        const project = schema.projects.find(user.projectId);

        return {
          token: jwt.sign(
            {
              userId: user.id,
              projectId: user.projectId,
              projectName: project.name,
              name: user.name,
              surname: user.surname,
              role: user.role
            },
            'shhhhh',
            { expiresIn: '1h' }
          )
        };
      });

      // makeRoutes(this);

      this.get('users', (schema) => {
        return schema.users.all();
      });

      this.get('bugs/impacts', () => impacts);

      this.get('bugs/priorities', () => priorities);

      this.get('bugs/types', () => types);

      this.get('bugs', (schema, request) => {
        const { projectId } = decodeMirageJWT(request);
        return schema.bugs.where({ projectId });
      });

      this.get('bugs/to_retest', (schema, request) => {
        const { projectId } = decodeMirageJWT(request);
        return schema.bugs.where(
          (bug) =>
            bug.projectId === projectId &&
            (bug.state === states.fixed || bug.state === states.retest)
        );
      });

      this.get('bugs/to_fix', (schema, request) => {
        const { projectId } = decodeMirageJWT(request);
        return schema.bugs.where({ projectId, state: states.new });
      });

      this.get('bugs/developer', (schema, request) => {
        const { projectId, userId } = decodeMirageJWT(request);
        return schema.bugs.where(
          (bug) =>
            bug.projectId === projectId &&
            bug.developerId === userId &&
            (bug.state === states.open || bug.state === states.reopened)
        );
      });

      this.get('bugs/:id', (schema, request) => {
        const { id } = request.params;
        return schema.bugs.find(id);
      });

      this.post('bugs', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.bugs.create(attrs);
      });

      this.put('bugs/:id', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { id } = request.params;
        return schema.bugs.find(id).update(attrs);
      });

      this.put('bugs/:state/:id', (schema, request) => {
        const { userId } = decodeMirageJWT(request);
        const { state, id } = request.params;
        const attrs = JSON.parse(request.requestBody);
        const relatedBug = schema.bugs.find(id);
        if (
          state === states.new ||
          state === states.open ||
          state === states.rejected ||
          state === states.reopened
        ) {
          relatedBug.update({
            retestsFailed: 0,
            retestsDone: 0,
            retestsRequired: 0
          });
        }
        if (state === states.fixed) {
          relatedBug.update({
            retestsFailed: 0,
            retestsDone: 0,
            retestsRequired: attrs.retestsRequired
          });
        }
        return relatedBug.update({ state, developerId: userId });
      });

      this.put('bugs/execute/:id', (schema, request) => {
        const { id } = request.params;
        const attrs = JSON.parse(request.requestBody);
        const relatedBug = schema.bugs.find(id);

        relatedBug.update({
          state: states.retest,
          retestsDone: relatedBug.retestsDone + 1,
          retestsFailed: attrs.outcome ? relatedBug.retestsFailed : relatedBug.retestsFailed + 1
        });

        if (relatedBug.retestsRequired === relatedBug.retestsDone) {
          if (relatedBug.retestsDone - relatedBug.retestsFailed >= relatedBug.retestsFailed) {
            relatedBug.update({
              state: states.closed
            });
          } else {
            relatedBug.update({
              state: states.reopened
            });
          }
        }

        return relatedBug;
      });

      this.delete('attachments/:id', (schema, request) => {
        const { id } = request.params;
        schema.attachments.find(id).destroy();
        return id;
      });

      this.post('attachments', (schema, request) => {
        const { url, bugId } = JSON.parse(request.requestBody);
        const relatedBug = schema.bugs.find(bugId);
        const attachment = relatedBug.createAttachment({ url });
        return attachment;
      });

      this.get('raports', (schema, request) => {
        const { projectId } = decodeMirageJWT(request);
        const project = schema.projects.find(projectId);

        const startDate = DateTime.fromISO(new Date(project.createdAt).toISOString());
        const endDate = DateTime.now();
        const daysFromStart = Math.floor(endDate.diff(startDate, 'days').days);

        return {
          daysFromStart,
          testers: schema.users.where({ projectId, role: roles.tester }).length,
          devs: schema.users.where({ projectId, role: roles.developer }).length,
          testSuites: 5, // TODO
          bugsAll: schema.bugs.where({ projectId }).length,
          bugsFixed: schema.bugs.where({ projectId, state: 'Fixed' }).length,
          bugsRejected: schema.bugs.where({ projectId, state: 'Rejected' }).length,
          bugsByImpact: [
            { name: 'High', value: schema.bugs.where({ projectId, impact: 'High' }).length },
            {
              name: 'Medium',
              value: schema.bugs.where({ projectId, impact: 'Medium' }).length
            },
            { name: 'Low', value: schema.bugs.where({ projectId, impact: 'Low' }).length }
          ],
          bugsByPriority: [
            {
              name: 'High',
              value: schema.bugs.where({ projectId, priority: 'High' }).length
            },
            {
              name: 'Medium',
              value: schema.bugs.where({ projectId, priority: 'Medium' }).length
            },
            { name: 'Low', value: schema.bugs.where({ projectId, priority: 'Low' }).length }
          ],
          testSuitesByName: [
            { name: 'Logging', value: 5 }, // TODO
            { name: 'Shop', value: 5 }, // TODO
            { name: 'About', value: 5 } // TODO
          ]
        };
      });

      this.passthrough('https://api.imgbb.com/**');
    },
    seeds(server) {
      // makeSeeds(server);

      const project = server.create('project');
      const developer = server.create('user', {
        project,
        role: roles.developer,
        password: defaultPassword
      });
      server.create('user', { project, role: roles.tester, password: defaultPassword });
      server.create('user', { project, role: roles.projectManager, password: defaultPassword });
      project.update({
        bugs: server.createList('bug', 98, { developer })
      });
    },
    factories: {
      project: Factory.extend({
        name() {
          return faker.commerce.productName();
        },
        createdAt() {
          return faker.date.recent(30);
        }
      }),
      bug: Factory.extend({
        code() {
          return `B-${faker.random.alphaNumeric(8).toUpperCase()}`;
        },
        name() {
          return faker.company.catchPhrase();
        },
        functionality() {
          return capitalizeFirstLetter(faker.company.bsBuzz());
        },
        type() {
          return randomFromArray(types);
        },
        state() {
          return randomFromArray(Object.values(states));
        },
        impact() {
          return randomFromArray(impacts);
        },
        priority() {
          return randomFromArray(priorities);
        },
        retestsRequired: 0,
        retestsDone: 0,
        retestsFailed: 0,
        description() {
          return faker.lorem.paragraphs(getRandomInt(1, 4));
        },
        deadline() {
          return faker.date.soon(10);
        },
        reportDate() {
          return faker.date.recent(30);
        },
        endDate() {
          return getRandomInt(0, 5) === 0 ? faker.date.between() : null;
        },
        executed: false, // TODO
        afterCreate(bug, server) {
          bug.update({
            attachments: server.createList('attachment', getRandomInt(1, 4))
          });
          if (bug.state === states.new) {
            bug.update({
              developer: null
            });
          }
        }
      }),
      attachment: Factory.extend({
        url() {
          return faker.image.technics(640, 480, true);
        }
      }),
      user: Factory.extend({
        name() {
          return faker.name.firstName();
        },
        surname() {
          return faker.name.lastName();
        },
        login() {
          const login = `${this.name}.${this.surname}@${this.project.name.replaceAll(
            ' ',
            '-'
          )}.com`.toLowerCase();
          return login;
        }
      })
    }
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
