import { CoreAPI } from '../core';

class BookingApi extends CoreAPI {
  async getBookingList() {
    const res = await this.fetch('/bookings', 'GET', { isNeedToken: false });
    return res;
  }

  //   TODO: Replace type "any" with proper type
  async createBooking(json: any) {
    const res = await this.fetch('/bookings', 'POST', { isNeedToken: true, json: { ...json } });
    return res;
  }
}

export default new BookingApi();
