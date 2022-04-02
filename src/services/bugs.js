import server from './server';

export const bugTypes = {
  toFix: 'to_fix',
  toRetest: 'to_retest',
  developer: 'developer'
};

export const bugStates = {
  rejected: 'reject',
  resolved: 'resolve',
  taken: 'take',
  resigned: 'resign'
};

const bugService = {
  async getOptions() {
    const resolved = await Promise.all([
      server.get({ url: 'bugs/types' }),
      server.get({ url: 'bugs/impacts' }),
      server.get({ url: 'bugs/priorities' })
    ]);

    return {
      types: resolved[0],
      impacts: resolved[1],
      priorities: resolved[2]
    };
  },

  async getBugs({ type }) {
    const url = type ? `bugs/${bugTypes[type]}` : 'bugs';
    const bugs = await server.get({ url });
    return bugs;
  },

  async getBug({ bugId }) {
    const bug = await server.get({ url: `bugs/${bugId}` });
    return bug;
  },

  async postBug({ newBugData }) {
    const bug = await server.post({ url: 'bugs', newBugData });
    return bug;
  },

  async putBug({ id, updatedBugData }) {
    const bug = await server.put({ url: `bugs/${id}`, updatedBugData });
    return bug;
  },

  async changeBugState({ id, state, retestsRequired }) {
    const data = await server.put({
      url: `bugs/${state}/${id}`,
      data: { retestsRequired }
    });
    return data;
  },

  async deleteAttachment({ id }) {
    await server.delete({ url: `attachments/${id}` });
  },

  async postAttachment({ bugId, imageBase64, imageName }) {
    const url = await server.postImage({ imageBase64, imageName });
    const id = await server.post({
      url: 'attachments',
      data: { url, bugId }
    });
    return { id, url };
  }
};

export default bugService;
