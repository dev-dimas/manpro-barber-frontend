/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { IUserData } from '@/interfaces';

interface UserStore {
  userData: IUserData | null | undefined;
  setUser: (user: IUserData | null) => void;
  removeUser: () => void;
}

const useUser = create<UserStore>((set) => ({
  userData: undefined,
  setUser: (user) => set({ userData: user }),
  removeUser: () => {
    Cookies.remove('accessToken');
    set({ userData: null });
  },
}));

export default useUser;
