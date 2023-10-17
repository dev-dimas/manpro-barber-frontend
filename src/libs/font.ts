import { Anton, Bebas_Neue, Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});
