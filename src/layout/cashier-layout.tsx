import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useGetEmployee } from '@/hooks/query';
import useEmployee from '@/hooks/store/useEmployee';
import { getClientSideCookie } from '@/libs/auth';
import { anton, bebasNeue, montserrat, ooohBaby } from '@/libs/font';
import { cn } from '@/libs/utils';
import SideNavbar from './components/cashier/side-navbar';
import SidebarBill from './components/cashier/sidebar-bill';

const CashierLayout = ({ children, loginForm = false }: { children: ReactNode; loginForm?: boolean }) => {
  const router = useRouter();
  const { pathname, push } = router;
  const { token } = getClientSideCookie();
  const payloadToken = token ? (jwtDecode(token).sub as any) : null;
  const idEmployee = payloadToken?.role !== undefined ? payloadToken?.id : null;
  const { data: employee, isLoading } = useGetEmployee(idEmployee);
  const employeeGlobalState = useEmployee((state) => state.employeeData);
  const setEmployee = useEmployee((state) => state.setEmployee);
  const removeEmployee = useEmployee((state) => state.removeEmployee);

  useEffect(() => {
    if (employee?.data && !isLoading) {
      setEmployee(employee.data);
    } else if (!employee?.data && !isLoading) {
      removeEmployee();
    }
  }, [employee, payloadToken, isLoading, removeEmployee, setEmployee]);

  if (payloadToken !== null && !payloadToken.role) {
    router.push('/user/dashboard');
    return null;
  }

  if (isLoading || employeeGlobalState === undefined) return;
  else if (employeeGlobalState === null && !isLoading) {
    if (pathname === '/cashier' || pathname === '/cashier/recap') {
      push('/cashier/login');
      return;
    }
  } else {
    if (pathname === '/cashier/login') {
      push('/cashier');
      return;
    }
  }

  return (
    <>
      <main className={cn(bebasNeue.variable, anton.variable, montserrat.variable, ooohBaby.variable, 'font-montserrat w-full h-screen')}>
        {loginForm ? (
          <>{children}</>
        ) : (
          <div className="w-full min-h-full flex">
            <div className="w-1/5 bg-#02221D relative">
              <aside className="w-1/5 bg-#02221D flex flex-col items-center py-5 px-10 fixed h-screen">
                <SideNavbar />
              </aside>
            </div>
            <div className="w-3/5 bg-#ECF4F3 p-5">{children}</div>
            <div className="w-1/5 bg-#02221D relative">
              <aside className="w-1/5 bg-#02221D flex flex-col items-center py-3 px-5 fixed h-screen">
                <SidebarBill />
              </aside>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default CashierLayout;
