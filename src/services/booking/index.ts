import { CoreAPI } from '../core';

class BookingApi extends CoreAPI {
  async getBookingList() {
    const res = await this.fetch('/booking', 'GET');
    return res;
  }

  async getBookingChart(json: any) {
    const res = await this.fetch('/booking-chart', 'POST', { json: { ...json } });
    return res;
  }

  async getTransactionHistory() {
    const res = await this.fetch('/transaction-history', 'GET', { isNeedToken: true });
    return res;
  }

  async getCashierConfirmBooking() {
    const res = await this.fetch('/confirm-booking', 'GET', { isNeedToken: true });
    return res;
  }
  //   TODO: Replace type "any" with proper type
  async createBooking(json: any) {
    const res = await this.fetch('/booking', 'POST', { isNeedToken: true, json: { ...json } });
    return res;
  }

  async createBookingByUser(json: any) {
    const res = await this.fetch('/user-booking', 'POST', { isNeedToken: true, json: { ...json } });
    return res;
  }

  async createBookingByEmployee(json: any) {
    const res = await this.fetch('/employee-booking', 'POST', { isNeedToken: true, json: { ...json } });
    return res;
  }

  async updateBookingByCashier(id: string) {
    const res = await this.fetch(`/booking/${id}`, 'PATCH', { isNeedToken: true });
    return res;
  }

  async getRecapData(json: any) {
    const res = await this.fetch('/recap', 'POST', { json: { ...json } });
    return res;
  }

  async getBookingById(id: string) {
    const res = await this.fetch(`/booking/${id}`, 'GET', { isNeedToken: true });
    return res;
  }
}

export default new BookingApi();
