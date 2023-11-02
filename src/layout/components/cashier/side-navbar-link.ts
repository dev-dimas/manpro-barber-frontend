export type TSideNavbarLink = {
  name: string;
  href: string;
};

export const sideNavbarLink: TSideNavbarLink[] = [
  {
    name: 'Dashboard',
    href: '/cashier',
  },
  {
    name: 'Booking',
    href: '/cashier/booking',
  },
  {
    name: 'Rekap',
    href: '/cashier/recap',
  },
  {
    name: 'Ubah Layanan',
    href: '/cashier/change-service',
  },
];
