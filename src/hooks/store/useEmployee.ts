/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { IEmployeeData } from '@/interfaces';

interface EmployeeStore {
  employeeData: IEmployeeData | null | undefined;
  setEmployee: (user: IEmployeeData | null) => void;
  removeEmployee: () => void;
}

const useEmployee = create<EmployeeStore>((set) => ({
  employeeData: undefined,
  setEmployee: (employee) => set({ employeeData: employee }),
  removeEmployee: () => {
    Cookies.remove('accessToken');
    set({ employeeData: null });
  },
}));

export default useEmployee;
