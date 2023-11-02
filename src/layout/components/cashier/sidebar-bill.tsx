import { Separator } from '@radix-ui/react-select';
import { PiMoneyLight } from 'react-icons/pi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const SidebarBill = () => {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString('id', { month: 'long' });
  const year = dateObj.getFullYear();

  return (
    <>
      <div className="flex items-center gap-5">
        <span className="text-sm text-#FFF000 font-semibold">Lorem Ipsum Dolor</span>
        <Avatar className="w-14 h-14">
          <AvatarImage src="/images/employee-1.jpg" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
      </div>
      <div className="bg-#ECF4F3 rounded-lg w-full font-bold text-xs py-[10px] px-[18px]">
        <div className="flex justify-between">
          <p>Tagihan</p>
          <p>{`${date} ${month} ${year}`}</p>
        </div>
        <Separator className="h-[0.5px] bg-black mt-2" />
        <div className="min-h-[300px]"></div>
        <div className="flex flex-col gap-5">
          <Button className="w-full bg-transparent border-#05312A border text-sm text-#05312A font-bold flex justify-around px-0" variant={'ghost'}>
            Bayar Tunai
            <PiMoneyLight size={35} />
          </Button>
          <Button className="w-full px-0 font-bold text-sm bg-#05312A text-white" variant={'outline'}>
            Cetak Struk
          </Button>
        </div>
      </div>
    </>
  );
};

export default SidebarBill;
