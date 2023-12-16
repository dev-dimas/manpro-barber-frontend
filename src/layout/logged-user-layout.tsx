import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AvatarCircleFillIcon, AvatarCircleIcon, DashboardIcon, LogoutIcon, ReceiptIcon } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/user/breadcrumb';
import useUser from '@/hooks/store/useUser';
import { cn } from '@/libs/utils';
import { UserLayout } from '.';

export default function LoggedUserLayout({ children }: { children: ReactNode }) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);
  const user = useUser((state) => state.userData);
  const removeUser = useUser((state) => state.removeUser);
  const router = useRouter();
  const { pathname } = router;
  const queryClient = useQueryClient();

  const handleLogout = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      removeUser();
      queryClient.removeQueries();
      setIsLogoutDialogOpen(false);
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed. Try again later!');
    }
  };

  return (
    <UserLayout>
      <div className="w-full flex justify-center mt-8">
        <div className="w-2/3 flex gap-3">
          <div className="w-1/3 bg-#05312A shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-b-[20px] h-fit">
            <div className="bg-#FFF000 px-8 py-5 flex rounded-b-[20px] gap-4 items-center">
              <Avatar className="h-[60px] w-[60px]">
                {user?.avatar && <Image src={user?.avatar as string} alt="User Avatar" height={1000} width={1000} />}
                {!user?.avatar && (
                  <AvatarFallback className="bg-#05312A">
                    <AvatarCircleFillIcon className="w-full h-full text-#FFF000" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-#05312A font-anton">
                <p className="text-sm">Hello Boss,</p>
                <p className="text-xl">{user?.name}</p>
              </div>
            </div>
            <div className="flex flex-col text-white text-sm my-10">
              <Link
                href={'/user/dashboard'}
                className={cn(
                  'flex items-center gap-5 px-8 py-[14px] hover:bg-#FFF000 hover:text-#05312A',
                  pathname.startsWith('/user/dashboard') && 'bg-#FFF000 text-#05312A'
                )}
              >
                <DashboardIcon className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href={'/user/transaction'}
                className={cn(
                  'flex items-center gap-5 px-8 py-[14px] hover:bg-#FFF000 hover:text-#05312A',
                  pathname.startsWith('/user/transaction') && 'bg-#FFF000 text-#05312A'
                )}
              >
                <ReceiptIcon className="w-5 h-5" />
                <span>Transaction History</span>
              </Link>
              <Link
                href={'/user/profile'}
                className={cn(
                  'flex items-center gap-5 px-8 py-[14px] hover:bg-#FFF000 hover:text-#05312A',
                  pathname.startsWith('/user/profile') && 'bg-#FFF000 text-#05312A'
                )}
              >
                <AvatarCircleIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    className="flex items-center gap-5 px-8 py-[14px] rounded-none hover:bg-#FFF000 hover:text-#05312A font-normal justify-start"
                    variant={'ghost'}
                  >
                    <LogoutIcon className="w-5 h-5" />
                    <span>Logout</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-#05312A hover:bg-#02221D" onClick={(e) => handleLogout(e)}>
                      Yes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="w-2/3 text-white flex flex-col mt-3 font-medium">
            <Breadcrumb />
            {children}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
