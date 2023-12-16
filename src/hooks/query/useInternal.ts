/**
 * This file, "useInternal.ts," is designed to provide hooks
 * for making API calls with a primary focus on the "get" method.
 * These hooks simplify the process of fetching data from server.
 */

import { useQuery } from 'react-query';
import { bookingApi, employeeApi, serviceApi, userApi } from '@/services';

export const useGetBookings = () => {
  return useQuery(['get-bookings'], () => bookingApi.getBookingList());
};

export const useGetEmployee = (id: string) => {
  return useQuery(['get-employee'], () => employeeApi.getEmployee(id), { enabled: id ? true : false });
};

export const useGetUser = (id: string) => {
  return useQuery(['get-user'], () => userApi.getUser(id), { enabled: id ? true : false });
};

export const useGetUserDashboard = () => {
  return useQuery(['user-dashboard'], () => userApi.getUserDashboard());
};

export const useGetAllEmployee = () => {
  return useQuery(['get-all-employee'], () => employeeApi.getAllEmployee());
};

export const useGetTransactionHistory = () => {
  return useQuery(['get-transaction-history'], () => bookingApi.getTransactionHistory());
};

export const useGetCashierConfirmBooking = () => {
  return useQuery(['get-cashier-confirm-booking'], () => bookingApi.getCashierConfirmBooking());
};

export const useGetAllService = () => {
  return useQuery(['get-all-service'], () => serviceApi.getAllService());
};

export const useGetOneService = (id: string) => {
  return useQuery(['get-service'], () => serviceApi.getOneService(id), { enabled: id ? true : false });
};

export const useGetBookingById = (id: string) => {
  return useQuery(['get-booking-by-id'], () => bookingApi.getBookingById(id), { enabled: id ? true : false, staleTime: Infinity });
};
