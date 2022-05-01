import server from './server';

const raportService = {
  async getRaport() {
    const raport = await server.get({ url: 'raports' });
    return raport;
  }
};

export default raportService;
