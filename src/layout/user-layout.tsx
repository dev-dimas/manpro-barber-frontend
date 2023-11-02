import { ReactNode } from 'react';
import { anton, bebasNeue, montserrat, ooohBaby } from '@/libs/font';
import { cn } from '@/libs/utils';
import Footer from './components/footer';
import Navbar from './components/navbar';

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={cn(bebasNeue.variable, anton.variable, montserrat.variable, ooohBaby.variable, 'font-montserrat')}>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
