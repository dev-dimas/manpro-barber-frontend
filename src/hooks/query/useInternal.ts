/**
 * This file, "useInternal.ts," is designed to provide hooks
 * for making API calls with a primary focus on the "get" method.
 * These hooks simplify the process of fetching data from server.
 */

import { useQuery } from 'react-query';
import { bookingApi } from '@/services';

export const useGetBookings = () => {
  return useQuery(['get-bookings'], () => bookingApi.getBookingList());
};
