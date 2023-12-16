import Image from 'next/image';
import { cn } from '@/libs/utils';

export default function ServiceCardList({ withShadow = false }: { withShadow?: boolean }) {
  return (
    <div className="flex gap-4">
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center flex-1',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/graphics/scissors.png'} alt="Scissors icon" width={65} height={65} className="py-16 rotate-[-45deg]" />
        <p className="font-anton text-2xl text-black uppercase">Signature Haircuts</p>
        <p className="text-sm text-black mt-1 pb-6">
          Stand out with our signature haircuts tailored to your face shape. We offer the latest and trendiest hairstyles to highlight your unique
          style.
        </p>
      </div>
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center flex-1',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/graphics/moustache.png'} alt="Scissors icon" width={65} height={65} className="py-16" />
        <p className="font-anton text-2xl text-black uppercase">Classic Shaves</p>
        <p className="text-sm text-black mt-1 pb-6">
          Experience the classic shave sensation with our shaving services. Using traditional tools and techniques, we provide a refreshing and smooth
          shaving experience.
        </p>
      </div>
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center flex-1',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/graphics/razor.png'} alt="Scissors icon" width={65} height={65} className="py-16" />
        <p className="font-anton text-2xl text-black uppercase">Precision Beard Styling</p>
        <p className="text-sm text-black mt-1 pb-6">
          Give your beard a special touch with our precision beard cutting and styling services. Using high-quality razors, we shape and tidy up your
          beard according to your preferences.
        </p>
      </div>
      <div
        className={cn(
          'flex flex-col bg-[#d9d9d9] rounded-sm justify-center items-center px-2 text-center flex-1',
          withShadow && 'bg-#ECF4F3 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]'
        )}
      >
        <Image src={'/graphics/hairstyle.png'} alt="Scissors icon" width={65} height={65} className="py-16" />
        <p className="font-anton text-2xl text-black uppercase">Gentlemen&apos;s Grooming Package</p>
        <p className="text-sm text-black mt-1 pb-6">
          Explore our comprehensive grooming package covering haircut, shaving, and mustache care. We deliver high-quality services for the modern man
          who values self-presentation.
        </p>
      </div>
    </div>
  );
}
