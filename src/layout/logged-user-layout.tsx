import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoReceiptOutline } from 'react-icons/io5';
import { LuGanttChartSquare, LuLogOut, LuUserCircle } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/user/breadcrumb';
import { cn } from '@/libs/utils';
import { UserLayout } from '.';

export default function LoggedUserLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <UserLayout>
      <div className="w-full flex justify-center mt-8">
        <div className="w-2/3 flex gap-3">
          <div className="w-1/3 bg-#05312A shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-b-[20px]">
            <div className="bg-#FFF000 px-8 py-5 flex rounded-b-[20px] gap-4 items-center">
              <FaUserCircle size={60} color={'#05312A'} />
              <div className="text-#05312A font-anton">
                <p className="text-sm">Hello Boss,</p>
                <p className="text-xl">John Doe</p>
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
                <LuGanttChartSquare size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                href={'/user/transaction'}
                className={cn(
                  'flex items-center gap-5 px-8 py-[14px] hover:bg-#FFF000 hover:text-#05312A',
                  pathname.startsWith('/user/transaction') && 'bg-#FFF000 text-#05312A'
                )}
              >
                <IoReceiptOutline size={20} />
                <span>Transaction History</span>
              </Link>
              <Link
                href={'/user/profile'}
                className={cn(
                  'flex items-center gap-5 px-8 py-[14px] hover:bg-#FFF000 hover:text-#05312A',
                  pathname.startsWith('/user/profile') && 'bg-#FFF000 text-#05312A'
                )}
              >
                <LuUserCircle size={20} />
                <span>Profile</span>
              </Link>
              <Button
                className="flex items-center gap-5 px-8 py-[14px] rounded-none hover:bg-#FFF000 hover:text-#05312A font-normal justify-start"
                variant={'ghost'}
                onClick={() => console.log('Handle onclick logout')}
              >
                <LuLogOut size={20} />
                <span>Logout</span>
              </Button>
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
