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
    name: 'Rekap',
    href: '/cashier/recap',
  },
];
