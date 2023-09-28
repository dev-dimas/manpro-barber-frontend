import { ReactNode } from 'react';
import { montserrat, rye } from '@/libs/font';
import { cn } from '@/libs/utils';
import Footer from './components/footer';
import Navbar from './components/navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={cn(rye.variable, montserrat.variable, 'font-montserrat')}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
