/* eslint-disable no-console */
import { Model } from 'miragejs';

const models = {
  bug: Model,
  type: Model,
  impact: Model,
  priority: Model
};

const routes = [
  (thisRef) =>
    thisRef.get('Errors/toFix', (schema) => {
      return schema.bugs.all().models;
    }),

  (thisRef) =>
    thisRef.get('Errors/toRetest', (schema) => {
      return schema.bugs.all().models;
    }),

  (thisRef) =>
    thisRef.get('Project/:productId/Errors', (schema) => {
      return schema.bugs.all().models;
    }),

  (thisRef) =>
    thisRef.get('Errors/developer/:developerId', (schema) => {
      return schema.bugs.all().models;
    }),

  (thisRef) =>
    thisRef.get('Errors/ErrorTypes', (schema) => {
      return schema.types.all().models.map((model) => model.text);
    }),

  (thisRef) =>
    thisRef.get('Errors/ErrorImpacts', (schema) => {
      return schema.impacts.all().models.map((model) => model.text);
    }),

  (thisRef) =>
    thisRef.get('Errors/ErrorPriorities', (schema) => {
      return schema.priorities.all().models.map((model) => model.text);
    }),

  (thisRef) =>
    thisRef.get('Errors/:id', (schema, request) => {
      const { id } = request.params;
      return schema.bugs.findBy({ id }).attrs;
    }),

  (thisRef) =>
    thisRef.post('Errors', (schema, request) => {
      console.log(JSON.parse(request.requestBody));
    }),

  (thisRef) =>
    thisRef.put('Errors/open/:id', (_, request) => {
      const { id } = request.params;
      const personId = JSON.parse(request.requestBody);
      console.log(personId, id);
    }),

  (thisRef) =>
    thisRef.put('Errors/resign/:id', (_, request) => {
      const { id } = request.params;
      const personId = JSON.parse(request.requestBody);
      console.log(personId, id);
    }),

  (thisRef) =>
    thisRef.put('Errors/reject/:id', (schema, request) => {
      const { id } = request.params;
      schema.bugs.findBy({ id }).update('errorState', 'Rejected');
    }),

  (thisRef) =>
    thisRef.put('Errors/fixed/:id', (schema, request) => {
      const { id } = request.params;
      const requiredRetests = JSON.parse(request.requestBody);
      console.log(requiredRetests, id);
      schema.bugs.findBy({ id }).update('errorState', 'Resolved');
    }),

  (thisRef) =>
    thisRef.post('Reviews/:id', (_, request) => {
      const { id } = request.params;
      const result = JSON.parse(request.requestBody);
      if (result) {
        console.log(`bugId: ${id} || retestsDone + 1`);
      } else {
        console.log(`bugId: ${id} || retestsFailed + 1`);
      }
    }),

  (thisRef) =>
    thisRef.get('Errors/:id/executed', (schema, request) => {
      const { id } = request.params;
      return schema.bugs.findBy({ id }).attrs.executed;
    }),

  (thisRef) =>
    thisRef.put('Errors/:id', (schema, request) => {
      const { id } = request.params;
      const json = JSON.parse(request.requestBody);
      console.log(json.deadline);

      console.log(schema.bugs.findBy({ id }));
      schema.bugs.findBy({ id }).update(json);
      console.log(schema.bugs.findBy({ id }));
    }),

  (thisRef) =>
    thisRef.get('Attachments/error/:id', (schema, request) => {
      const { id } = request.params;
      return schema.bugs.findBy({ id }).attrs.attachments;
    }),

  (thisRef) =>
    thisRef.delete('Attachments/:id', (schema, request) => {
      const { id } = request.params;
      console.log(`deleted: ${id}`);
    })
];

const seeds = [
  (serverRef) =>
    [
      {
        id: '22bd1f84-b9e5-4183-9502-036eafe67622',
        code: 'E-91563764',
        name: 'Not responding',
        errorState: 'New',
        functionality: 'Login',
        errorType: 'Functional',
        errorImpact: 'High',
        errorPriority: 'Low',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-05T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: true,
        attachments: [
          { id: '1', image: 'https://i.ibb.co/StvZxmy/sample-image.jpg' },
          { id: '2', image: 'https://i.ibb.co/zNXRSrg/photo-1579353977828-2a4eab540b9a.jpg' },
          { id: '3', image: 'https://i.ibb.co/M5HM3sV/download.jpg' },
          { id: '4', image: 'https://i.ibb.co/47VtZhY/0266554465.jpg' }
        ]
      },
      {
        id: '72AD77FC-B88D-4EC6-A757-A6A3864BAFFF',
        code: 'E-72AD77FC',
        name: 'Table not visible',
        errorState: 'New',
        functionality: 'Register',
        errorType: 'Functional',
        errorImpact: 'Low',
        errorPriority: 'Medium',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: true,
        attachments: [{ id: '1', image: 'https://i.ibb.co/StvZxmy/sample-image.jpg' }]
      },
      {
        id: 'A7C33D4D-AC7B-4353-B192-596D70327625',
        code: 'E-A7C33D4D',
        name: 'Internet down',
        errorState: 'Retest',
        functionality: 'Add product',
        errorType: 'Logic',
        errorImpact: 'Medium',
        errorPriority: 'Low',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: true,
        attachments: []
      },
      {
        id: '2B7846E7-98A5-42E2-9E5C-C7D9BB779F25',
        code: 'E-2B7846E7',
        name: '0123456789012345678912345',
        errorState: 'Fixed',
        functionality: 'Login',
        errorType: 'Logic',
        errorImpact: 'Low',
        errorPriority: 'Medium',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: '5CE3FE96-872C-4541-A420-EA35F77A13E2',
        code: 'E-5CE3FE96',
        name: 'Big bang',
        errorState: 'Active',
        functionality: 'Login',
        errorType: 'Data Type',
        errorImpact: 'Medium',
        errorPriority: 'High',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: '9D663266-3805-47F8-AFFA-0B17F1B78CCF',
        code: 'E-9D663266',
        name: 'Rain is raining',
        errorState: 'Resolved',
        functionality: 'Login',
        errorType: 'Data Type',
        errorImpact: 'High',
        errorPriority: 'High',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: '5AE2C988-F058-4555-ADF5-3B0F66326B2F',
        code: 'E-5AE2C988',
        name: 'Goblins attack',
        errorState: 'Rejected',
        functionality: 'Login',
        errorType: 'Code Duplication',
        errorImpact: 'Low',
        errorPriority: 'Low',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: 'C9F996F3-6459-485E-8F30-E314FE6CC4BA',
        code: 'E-C9F996F3',
        name: 'Lorem ipsum dolor',
        errorState: 'Resolved',
        functionality: 'Login',
        errorType: 'Logic',
        errorImpact: 'Medium',
        errorPriority: 'Medium',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: '50C07E32-DEC9-4EBD-8DD1-30C631729BB2',
        code: 'E-50C07E32',
        name: 'Lorem ipsum dolor',
        errorState: 'Resolved',
        functionality: 'Login',
        errorType: 'Logic',
        errorImpact: 'High',
        errorPriority: 'High',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: '99E4D145-5BA1-4FF1-BB60-C9D5A408C7C7',
        code: 'E-99E4D145',
        name: 'Lorem ipsum dolor',
        errorState: 'Fixed',
        functionality: 'Login',
        errorType: 'Code Duplication',
        errorImpact: 'Medium',
        errorPriority: 'Low',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: 'D9C27689-268B-4623-AFE2-53CC920B73EB',
        code: 'E-D9C27689',
        name: 'Lorem ipsum dolor',
        errorState: 'Fixed',
        functionality: 'Login',
        errorType: 'Code Duplication',
        errorImpact: 'Low',
        errorPriority: 'Low',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: '1DB009F5-02B9-4B6B-8A00-B9346D07DB1D',
        code: 'E-1DB009F5',
        name: 'Lorem ipsum dolor',
        errorState: 'New',
        functionality: 'Login',
        errorType: 'Data Type',
        errorImpact: 'Low',
        errorPriority: 'Medium',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      },
      {
        id: 'BA4E6298-ADEF-40F6-9880-C6389C63436C',
        code: 'E-BA4E6298',
        name: 'Lorem ipsum dolor',
        errorState: 'Retest',
        functionality: 'Login',
        errorType: 'Security',
        errorImpact: 'High',
        errorPriority: 'Low',
        retestsRequired: 2,
        retestsDone: 0,
        retestsFailed: 0,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam nemo, itaque iste excepturi voluptas eveniet ab quod laudantium quis!',
        deadline: '2021-12-20T00:00:00',
        reportDate: '2021-12-20T00:00:00',
        endDate: '2021-12-20T00:00:00',
        executed: false,
        attachments: []
      }
    ].forEach((bug) => {
      serverRef.create('bug', bug);
    }),

  (serverRef) =>
    [
      { text: 'Functional' },
      { text: 'Performance' },
      { text: 'Usability' },
      { text: 'Compatibility' },
      { text: 'Security' },
      { text: 'Syntax' },
      { text: 'Logic' },
      { text: 'Unit-level' },
      { text: 'System-level' },
      { text: 'Code Duplication' },
      { text: 'Data Type' }
    ].forEach((type) => serverRef.create('type', type)),

  (serverRef) =>
    [{ text: 'High' }, { text: 'Medium' }, { text: 'Low' }].forEach((impact) =>
      serverRef.create('impact', impact)
    ),

  (serverRef) =>
    [{ text: 'High' }, { text: 'Medium' }, { text: 'Low' }].forEach((priority) =>
      serverRef.create('priority', priority)
    )
];

export default { models, routes, seeds };
