import { CoreAPI } from '../core';

class PaymentApi extends CoreAPI {
  async addPayment(json: any) {
    const res = await this.fetch('/payment', 'POST', { isNeedToken: true, json: { ...json } });
    return res;
  }
}

export default new PaymentApi();
