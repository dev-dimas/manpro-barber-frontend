export interface IUserData {
  id: string;
  email: string;
  name: string;
  phone: string;
  point: number;
  isActive: boolean;
  avatar: null | string;
  pathAvatar: null | string;
  gender: null | string;
  birthdayDate: null | string;
  address: null | string;
  createdAt: '2023-12-08T13:07:23.261Z';
  updatedAt: '2023-12-08T13:07:23.261Z';
}

export interface IEmployeeData {
  id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  gender: string;
  role: string;
  isIncharge: boolean;
  createdAt: string;
  updatedAt: string;
}
