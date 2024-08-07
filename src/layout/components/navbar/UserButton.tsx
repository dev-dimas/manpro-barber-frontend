import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AvatarCircleIcon, DashboardIcon, LogoutIcon, ReceiptIcon } from '@/components/icons';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useUser from '@/hooks/store/useUser';
import { cn } from '@/libs/utils';

export default function UserButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);
  const user = useUser((state) => state.userData);
  const removeUser = useUser((state) => state.removeUser);
  const router = useRouter();
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
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="text-white">
        <div className="flex justify-center items-center h-10 gap-2">
          <Avatar className="h-auto w-10">
            {user?.avatar && <Image src={user?.avatar as string} alt="User Avatar" height={500} width={500} className="aspect-square" />}
            {!user?.avatar && (
              <AvatarFallback className="bg-transparent">
                <AvatarCircleIcon className="w-full h-full text-#FFF000" />
              </AvatarFallback>
            )}
          </Avatar>
          <ChevronDown color="#fff000" className={cn(isOpen && 'rotate-180', 'transition-transform')} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={'/booking'} className="flex items-center gap-1">
            <LuPlus size={18} />
            <span>Create Booking</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user/dashboard'} className="flex items-center gap-1">
            <DashboardIcon className="w-[18px] h-[18px]" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user/transaction'} className="flex items-center gap-1">
            <ReceiptIcon className="w-[18px] h-[18px]" />
            <span>Transaction History</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user/profile'} className="flex items-center gap-1">
            <AvatarCircleIcon className="w-[18px] h-[18px]" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" onClick={(e) => e.preventDefault()}>
          <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="flex items-center gap-1 w-full justify-start font-normal h-auto px-2 py-1.5" variant={'ghost'}>
                <LogoutIcon className="w-[18px] h-[18px]" />
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
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
