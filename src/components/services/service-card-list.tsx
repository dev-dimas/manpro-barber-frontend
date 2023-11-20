import Image from 'next/image';
import { cn } from '@/libs/utils';

export default function ServiceCardList({ withShadow = false }: { withShadow?: boolean }) {
  return (
    <div className="flex gap-4">
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/icons/scissors.svg'} alt="Scissors icon" width={65} height={65} className="py-16" />
        <p className="font-anton text-2xl text-black uppercase">Lorem Ipsum</p>
        <p className="text-sm text-black mt-1 pb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/icons/moustache.svg'} alt="Scissors icon" width={65} height={65} className="py-16" />
        <p className="font-anton text-2xl text-black uppercase">Lorem Ipsum</p>
        <p className="text-sm text-black mt-1 pb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/icons/razor.svg'} alt="Scissors icon" width={65} height={65} className="py-16" />
        <p className="font-anton text-2xl text-black uppercase">Lorem Ipsum</p>
        <p className="text-sm text-black mt-1 pb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/icons/hairstyle.svg'} alt="Scissors icon" width={65} height={65} className="py-16" />
        <p className="font-anton text-2xl text-black uppercase">Lorem Ipsum</p>
        <p className="text-sm text-black mt-1 pb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
    </div>
  );
}
