import { Montserrat, Rye } from 'next/font/google';

export const rye = Rye({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rye',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});
