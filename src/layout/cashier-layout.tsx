import { ReactNode } from 'react';
import { anton, bebasNeue, montserrat, ooohBaby } from '@/libs/font';
import { cn } from '@/libs/utils';
import SideNavbar from './components/cashier/side-navbar';
import SidebarBill from './components/cashier/sidebar-bill';

const CashierLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className={cn(bebasNeue.variable, anton.variable, montserrat.variable, ooohBaby.variable, 'font-montserrat w-full h-screen')}>
        <div className="w-full h-full flex">
          <aside className="w-1/5 bg-#02221D flex flex-col items-center py-5 px-10">
            <SideNavbar />
          </aside>
          <div className="w-3/5 bg-#ECF4F3 p-5">{children}</div>
          <aside className="w-1/5 bg-#02221D flex flex-col items-center py-3 px-5">
            <SidebarBill />
          </aside>
        </div>
      </main>
    </>
  );
};

export default CashierLayout;
