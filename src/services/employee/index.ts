import { CoreAPI } from '../core';

class EmployeeApi extends CoreAPI {
  async getAllEmployee() {
    const res = await this.fetch('/employee', 'GET');
    return res;
  }

  async getEmployee(id: string) {
    const res = await this.fetch(`/employee/${id}`, 'GET', { isNeedToken: true });
    return res;
  }

  async loginEmployee(json: { email: string; password: string; remember: boolean }) {
    const res = await this.fetch('/login/employee', 'POST', { json: { ...json } });
    if (res.data.accessToken) this.setToken({ token: res.data.accessToken, expireable: json.remember });
    return res;
  }
}

export default new EmployeeApi();
