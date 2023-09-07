/**
 * This file, "useTodo.ts," is designed to provide hooks
 * for making API calls with a primary focus on the "post/put/delete" method.
 * These hooks simplify the process of mutate data from server.
 */

import { bookingApi } from '@/services';
import { useMutation } from 'react-query';

// TODO: Give parameter json with proper type
export const useCreateBooking = () => {
  return useMutation((json) => {
    return bookingApi.createBooking(json);
  });
};
