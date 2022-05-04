import { roles, defaultPassword } from '../constants';
import getRandomInt from '../../../utils/getRandomInt';

export function seeds(server) {
  // * *** CREATE PROJECT *** * //
  const project = server.create('project');

  // * *** CREATE USERS *** * //
  const developer = server.create('user', {
    project,
    role: roles.developer,
    password: defaultPassword
  });
  server.create('user', { project, role: roles.tester, password: defaultPassword });
  server.create('user', { project, role: roles.projectManager, password: defaultPassword });

  // * *** CREATE TEST PLANS AND BUGS *** * //
  const testPlans = server.createList('testPlan', 3, { project });

  testPlans.forEach((testPlan) => {
    const testCategories = server.createList('testCategory', 2, { project, testPlan });

    testCategories.forEach((testCategory) => {
      const tests = server.createList('test', 3, { testCategory });

      tests.forEach((test) => {
        const steps = server.createList('step', 3, { test });

        steps.forEach((step) => {
          server.createList('bug', getRandomInt(0, 2), { project, step, developer });
        });
      });
    });
  });
}
