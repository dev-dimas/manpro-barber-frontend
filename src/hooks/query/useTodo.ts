/**
 * This file, "useTodo.ts," is designed to provide hooks
 * for making API calls with a primary focus on the "post/put/delete" method.
 * These hooks simplify the process of mutate data from server.
 */

import { useMutation } from 'react-query';
import { bookingApi, employeeApi, paymentApi, userApi } from '@/services';

// TODO: Give parameter json with proper type
export const useCreateBooking = () => {
  return useMutation((json) => {
    return bookingApi.createBooking(json);
  });
};

export const useCreateUser = () => {
  return useMutation((json: any) => {
    return userApi.createUser(json);
  });
};

export const useLoginUser = () => {
  return useMutation((json: any) => {
    return userApi.loginUser(json);
  });
};

export const useLoginEmployee = () => {
  return useMutation((json: any) => {
    return employeeApi.loginEmployee(json);
  });
};

export const useUpdateUserProfile = (id: string) => {
  return useMutation((data: any) => {
    return userApi.updateUserProfile(data, id);
  });
};

export const useForgotPassword = () => {
  return useMutation((json: any) => {
    return userApi.forgotPassword(json);
  });
};

export const useUpdateUserPassword = () => {
  return useMutation((json: any) => {
    return userApi.updateUserPassword(json);
  });
};

export const useGetBookingChart = () => {
  return useMutation((json: any) => {
    return bookingApi.getBookingChart(json);
  });
};

export const useCreateBookingByUser = () => {
  return useMutation((json: any) => {
    return bookingApi.createBookingByUser(json);
  });
};

export const useCreateBookingByEmployee = () => {
  return useMutation((json: any) => {
    return bookingApi.createBookingByEmployee(json);
  });
};

export const useUpdateBookingByCashier = () => {
  return useMutation((id: string) => {
    return bookingApi.updateBookingByCashier(id);
  });
};

export const useAddPayment = () => {
  return useMutation((json: any) => {
    return paymentApi.addPayment(json);
  });
};

export const useGetDataRecap = () => {
  return useMutation((json: any) => {
    return bookingApi.getRecapData(json);
  });
};
