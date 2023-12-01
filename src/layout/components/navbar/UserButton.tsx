import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoReceiptOutline } from 'react-icons/io5';
import { LuGanttChartSquare, LuLogOut, LuPlus, LuUserCircle } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/libs/utils';

export default function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DropdownMenuTrigger className="text-white">
        <div className="flex justify-center items-center h-10 gap-2">
          <Image src={'/icons/profile-circle.svg'} alt="User Action" width={40} height={40} />
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
            <LuGanttChartSquare size={18} />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user/transaction'} className="flex items-center gap-1">
            <IoReceiptOutline size={18} />
            <span>Transaction History</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user/profile'} className="flex items-center gap-1">
            <LuUserCircle size={18} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            className="flex items-center gap-1 w-full justify-start font-normal h-auto"
            variant={'ghost'}
            onClick={() => console.log('Handle onclick logout')}
          >
            <LuLogOut size={18} />
            <span>Logout</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
