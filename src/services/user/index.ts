import { CoreAPI } from '../core';

class UserApi extends CoreAPI {
  async getUser(id: string) {
    const res = await this.fetch(`/user/${id}`, 'GET', { isNeedToken: true });
    return res;
  }

  async getUserDashboard() {
    const res = await this.fetch('/dashboard-user', 'GET', { isNeedToken: true });
    return res;
  }

  async createUser(json: any) {
    const res = await this.fetch('/user', 'POST', { json: { ...json } });
    return res;
  }

  async loginUser(json: any) {
    const res = await this.fetch('/login/user', 'POST', { json: { ...json } });
    if (res.data.accessToken) {
      this.setToken({ token: res.data.accessToken, expireable: json.remember });
    }
    return res;
  }

  async updateUserProfile(formData: any, id: string) {
    const res = await this.fetch(`/user/${id}`, 'PUT', { body: formData, isNeedToken: true });
    return res;
  }

  async updateUserPassword(json: any) {
    const res = await this.fetch('/password/change', 'PATCH', { json: { ...json }, isNeedToken: true });
    return res;
  }

  async forgotPassword(json: any) {
    const res = await this.fetch('/password/forgot', 'PATCH', { json: { ...json } });
    return res;
  }
}

export default new UserApi();
