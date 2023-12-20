import dayjs from 'dayjs';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdCopyAll } from 'react-icons/md';
import { toast } from 'react-toastify';
import { TicketIcon } from '@/components/icons';
import TitlePage from '@/components/TitlePage';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetBookingById } from '@/hooks/query';
import { anton, montserrat } from '@/libs/font';
import { cn } from '@/libs/utils';

export default function Id() {
  const router = useRouter();
  const bookingId = router.query.id;

  const { data: booking, isLoading } = useGetBookingById(bookingId as string);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.style.scrollbarGutter = 'auto';
    }
    return () => {
      if (html) {
        html.style.scrollbarGutter = 'stable';
      }
    };
  }, []);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(booking.data.id);
      toast.success('Transaction id copied!');
    } catch {
      toast.error('Failed to copy transaction id. Try again later!');
    }
  };

  if (isLoading && bookingId) return null;
  if (!isLoading && !booking?.data) {
    return (
      <div className={cn(montserrat.variable, 'flex w-full h-full justify-center items-center font-montserrat')}>
        <h1 className="text-white font-medium text-2xl">404 | Page Not Found</h1>
      </div>
    );
  }
  return (
    <div className={cn(montserrat.variable, anton.variable, 'font-montserrat')}>
      <TitlePage>Transaction - Barberque</TitlePage>
      {/* Hero Header */}
      <div className="flex flex-col justify-center items-center w-full h-screen bg-[url('/images/hero-image-4.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[rgb(5,49,42)]"></div>

        <div className="flex items-center px-28 py-3 w-full">
          <div className="flex flex-1 justify-between w-full relative">
            <Image src="/images/logo-barberque.png" alt="Logo barberque" width={300} height={200} className="object-contain h-fit" />
            <div className="flex flex-col bg-#ECF4F3 py-7 px-8 rounded-[10px] max-w-[27%]">
              <div className="flex items-center gap-2">
                <TicketIcon className="text-[#292D32] w-6 h-6" />
                <p className="font-anton text-sm text-black">Reservation Success !</p>
              </div>
              <Separator className="h-[1px] bg-[rgba(0,_0,_0_,0.50)] my-2" />
              <p className="text-black text-xs pb-5">
                {booking.data.status === 'booking'
                  ? 'We have received your order. You can come to our Barbershop 10 minutes before the schedule stated on the ticket.'
                  : 'Thank you for your order. We look forward to welcoming you again soon!.'}
              </p>

              {/* Chair image */}
              <div className="w-full h-[162px] py-2 flex justify-center items-center relative">
                <div className="h-full max-h-[210px] aspect-square bg-#FFF000 rounded-full flex items-center relative">
                  <Image
                    src={'/images/chair.png'}
                    alt="Chair image"
                    width={188}
                    height={250}
                    className="h-[120%] w-full object-cover absolute left-[-15px]"
                  />
                </div>
                <div className="h-full max-w-[37px] w-full">
                  <div className="max-h-[37px] h-1/5 aspect-square bg-#FFF000 rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-[22px] pt-3 pb-5">
                <div className="w-full flex justify-between text-black text-xs">
                  <p>Id Transaction</p>
                  <div className="flex gap-4">
                    <p>{booking.data.id}</p>
                    <Button
                      className="text-xs px-2 py-0 h-4 bg-transparent text-[#b3b3b3] rounded-[5px] border border-[#b3b3b3] font-semibold"
                      onClick={handleCopyToClipboard}
                    >
                      Copy
                      <MdCopyAll className="pl-1" size={16} />
                    </Button>
                  </div>
                </div>
                <div className="w-full flex justify-between text-black text-xs">
                  <p>Services</p>
                  <p>{booking.data.serviceName}</p>
                </div>
                <div className="w-full flex justify-between text-black text-xs">
                  <p>Cost</p>
                  <p>Rp{booking.data.price.toLocaleString('id')}</p>
                </div>
                <div className="w-full flex justify-between text-black text-xs">
                  <p>Time</p>
                  <p>{dayjs(`${booking.data.date} ${booking.data.starttime.slice(0, 5)}`).format('dddd, DD-MM-YYYY HH:mm')}</p>
                </div>
              </div>

              <Link
                href={'/'}
                className="bg-#05312A hover:bg-#02221D uppercase rounded-[5px] text-white flex justify-center items-center gap-2 py-[14px] text-sm"
              >
                <HomeIcon size={16} /> Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
