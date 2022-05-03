import server from './server';

const testService = {
  async getTestPlans() {
    const testPlans = await server.get({ url: 'test_plans' });
    return testPlans;
  },
  async getTestPlan({ id }) {
    const testPlans = await server.get({ url: `test_plans/${id}` });
    return testPlans;
  },
  async getTest({ id }) {
    const test = await server.get({ url: `test/${id}` });
    return test;
  },
  async getTestRelatedToBug({ bugId }) {
    const test = await server.get({ url: `test/from_bug/${bugId}` });
    return test;
  },
  async executeTest({ id }) {
    const data = await server.put({ url: `tests/${id}/execute` });
    return data;
  }
};

export default testService;
