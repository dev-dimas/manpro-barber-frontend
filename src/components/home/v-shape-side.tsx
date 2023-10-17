import { cn } from '@/libs/utils';

const VShapeSide = ({ foreground, className }: { foreground: string; className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className={cn('v-shape-side', className)}>
      <path d="M0 0L720 73.9556L1440 0V512H0V0Z" fill={foreground} />
    </svg>
  );
};

export default VShapeSide;
