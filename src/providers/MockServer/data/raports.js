/* eslint-disable no-console */

const routes = [
  (thisRef) =>
    thisRef.get('Chart', () => {
      return {
        daysFromStart: 5,
        testersNumber: 5,
        devsNumber: 5,
        testSuitesNumber: 5,
        bugsAll: 5,
        bugsFixed: 2,
        bugsRejected: 1,
        bugsByImpact: [
          { name: 'High', value: 5 },
          { name: 'Medium', value: 5 },
          { name: 'Low', value: 5 }
        ],
        bugsByPriority: [
          { name: 'High', value: 5 },
          { name: 'Medium', value: 5 },
          { name: 'Low', value: 5 }
        ],
        testSuitesByName: [
          { name: 'Logging', value: 5 },
          { name: 'Shop', value: 5 },
          { name: 'About', value: 5 }
        ]
      };
    })
];

export default { models: [], routes, seeds: [] };
