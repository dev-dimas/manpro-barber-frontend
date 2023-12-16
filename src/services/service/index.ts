import { CoreAPI } from '../core';

class ServiceApi extends CoreAPI {
  async getAllService() {
    const res = await this.fetch('/service', 'GET');
    return res;
  }

  async getOneService(id: string) {
    const res = await this.fetch(`/service/${id}`, 'GET');
    return res;
  }
}

export default new ServiceApi();
