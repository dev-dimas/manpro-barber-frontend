import Image from 'next/image';
import { montserrat } from '@/libs/font';
import { cn } from '@/libs/utils';

export default function Loading() {
  return (
    <div className={cn('w-full h-full bg-#05312A flex items-center justify-center', montserrat.className)}>
      <div className="flex items-center justify-center flex-col gap-2">
        <Image src="/images/logo-barberque.png" alt="Logo barberque" width={200} height={200} className="animate-pulse" />
        <p className="text-white font-semibold">Loading . . .</p>
      </div>
    </div>
  );
}
