import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useMemo } from 'react';
import { useGetUser } from '@/hooks/query';
import useUser from '@/hooks/store/useUser';
import { getClientSideCookie } from '@/libs/auth';
import { anton, bebasNeue, montserrat, ooohBaby } from '@/libs/font';
import { cn } from '@/libs/utils';
import Footer from './components/footer';
import Navbar from './components/navbar';

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { token } = getClientSideCookie();
  const setUser = useUser((state) => state.setUser);
  const removeUser = useUser((state) => state.removeUser);
  const userGlobalState = useUser((state) => state.userData);
  const router = useRouter();
  const { push, pathname } = router;
  const payloadToken = token ? (jwtDecode(token).sub as any) : null;
  const idUser = payloadToken?.role === undefined ? payloadToken?.id : null;
  const { data: user, isLoading } = useGetUser(idUser);
  const loggedRedirectUrl = useMemo(() => ['/login', '/register', '/forgot-password'], []);

  useEffect(() => {
    if (user?.data && !isLoading) {
      setUser(user.data);
    } else if (!user?.data && !isLoading) {
      removeUser();
    }
  }, [isLoading, payloadToken, removeUser, setUser, user]);

  if (isLoading || userGlobalState === undefined) return null;
  else if (userGlobalState === null && !isLoading) {
    if (pathname.startsWith('/user')) {
      push('/login');
      return;
    }
  } else {
    if (loggedRedirectUrl.find((url: string) => pathname.startsWith(url))) {
      push('/user/dashboard');
      return;
    }
  }
  return (
    <>
      <Navbar />
      <main className={cn(bebasNeue.variable, anton.variable, montserrat.variable, ooohBaby.variable, 'font-montserrat')}>{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
