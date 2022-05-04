import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

import { DateTime } from 'luxon';
import decodeMirageJWT from '../../../utils/decodeMirageJWT';
import { roles, states, types, priorities, impacts } from '../constants';

export function routes() {
  this.urlPrefix = 'https://fun-test-zpi.herokuapp.com';
  this.namespace = '/api/';

  // * *** AUTH *** * //

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

  this.get('users', (schema) => {
    return schema.users.all();
  });

  // * *** TEST PLANS *** * //

  this.get('test_plans', (schema, request) => {
    const { projectId } = decodeMirageJWT(request);
    return schema.testPlans.where({ projectId });
  });

  this.get('test_plans/:id', (schema, request) => {
    const { id } = request.params;
    return schema.testPlans.find(id);
  });

  // * *** TESTS *** * //

  this.get('test/:id', (schema, request) => {
    const { id } = request.params;
    return schema.tests.find(id);
  });

  this.get('test/from_bug/:bugId', (schema, request) => {
    const { bugId } = request.params;
    const relatedBug = schema.bugs.find(bugId);
    return relatedBug.step.test;
  });

  this.put('tests/:id/execute', (schema, request) => {
    const { id } = request.params;
    const test = schema.tests.find(id);
    return schema.tests.find(id).update({ executions: test.executions + 1 });
  });

  // * *** BUGS *** * //

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
        bug.projectId === projectId && (bug.state === states.fixed || bug.state === states.retest)
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
    const { projectId } = decodeMirageJWT(request);
    const attrs = JSON.parse(request.requestBody);
    return schema.bugs.create({
      ...attrs,
      projectId,
      retestsDone: 0,
      retestsFailed: 0,
      retestsRequired: 0,
      code: `B-${faker.random.alphaNumeric(8).toUpperCase()}`,
      evaluatedBy: [],
      developer: null,
      state: states.new
    });
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

  this.put('bugs/evaluate/:id', (schema, request) => {
    const { id } = request.params;
    const { userId } = decodeMirageJWT(request);
    const attrs = JSON.parse(request.requestBody);
    const relatedBug = schema.bugs.find(id);

    const wasEvaluated = relatedBug.evaluatedBy.includes(userId);

    relatedBug.update({
      state: states.retest,
      retestsDone: relatedBug.retestsDone + 1,
      retestsFailed: attrs.result ? relatedBug.retestsFailed : relatedBug.retestsFailed + 1,
      evaluatedBy: wasEvaluated ? relatedBug.evaluatedBy : [...relatedBug.evaluatedBy, userId]
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

  // * *** ATTACHMENTS *** * //

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

  // * *** RAPORTS *** * //

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
      testSuites: schema.testCategories.where({ projectId }).length,
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
      testSuitesByName: schema.testCategories.where({ projectId }).models.map((testCategory) => ({
        name: testCategory.name,
        value: testCategory.tests.length
      }))
    };
  });

  this.passthrough('https://api.imgbb.com/**');
}
