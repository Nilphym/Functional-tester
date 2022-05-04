import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

import getRandomInt from '../../../utils/getRandomInt';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import randomFromArray from '../../../utils/randomFromArray';
import { states, types, priorities, impacts } from '../constants';

export const factories = {
  project: Factory.extend({
    name() {
      return faker.commerce.productName();
    },
    createdAt() {
      return faker.date.recent(30);
    }
  }),

  testPlan: Factory.extend({
    name() {
      return faker.company.catchPhrase();
    }
  }),

  testCategory: Factory.extend({
    name() {
      return faker.company.catchPhrase();
    }
  }),

  test: Factory.extend({
    name() {
      return faker.company.catchPhrase();
    },
    preconditions() {
      return faker.lorem.sentences(1);
    },
    entryData() {
      const count = getRandomInt(1, 4);
      const entryData = Array(count).fill(null);

      return entryData.map(() => {
        const width = getRandomInt(2, 5);
        const height = getRandomInt(2, 5);
        const emptyTable = Array(height)
          .fill(null)
          .map(() => Array(width).fill(0));
        return {
          name: faker.commerce.department(),
          table: emptyTable.map((row, index) =>
            row.map(() => (index === 0 ? faker.database.column() : faker.lorem.word()))
          )
        };
      });
    },
    result() {
      return faker.lorem.sentences(1);
    },
    executions: 0
  }),

  step: Factory.extend({
    name() {
      return faker.git.commitMessage();
    },
    testData() {
      const count = getRandomInt(0, 2);
      const testData = Array(count).fill(null);

      return testData.map(() => {
        const width = getRandomInt(2, 5);
        const height = getRandomInt(2, 5);
        const emptyTable = Array(height)
          .fill(null)
          .map(() => Array(width).fill(0));
        return {
          name: faker.commerce.department(),
          table: emptyTable.map((row, index) =>
            row.map(() => (index === 0 ? faker.database.column() : faker.lorem.word()))
          )
        };
      });
    },
    controlPoint() {
      return faker.lorem.sentences(1);
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
    evaluatedBy: [],
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
};
