import Image from 'next/image';
import { cn } from '@/libs/utils';

interface EmployeeCardProps {
  className?: string;
  imgSrc: string;
  name: string;
  description: string;
}

const EmployeeCard = ({ className, imgSrc, name, description }: EmployeeCardProps) => {
  return (
    <div className={cn('flex flex-col bg-#ECF4F3 px-3 py-[9px] rounded-[5px] gap-2', className)}>
      <Image src={imgSrc} alt="Employee Picture" width={287} height={287} className="w-[287px] h-[287px]" />
      <div className="text-center pb-2">
        <p className="text-2xl font-anton text-#05312A">{name}</p>
        <p className="text-xs font-medium text-black">{description}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
