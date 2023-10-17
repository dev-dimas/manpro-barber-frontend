import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { cn } from '@/libs/utils';
import { Separator } from '../ui/separator';

const colorVariants = cva('frame', {
  variants: {
    color: {
      green: 'bg-#05312A',
      yellow: 'bg-#FFF000',
    },
  },
  defaultVariants: {
    color: 'green',
  },
});

interface TitleFrameProps extends VariantProps<typeof colorVariants> {
  children: ReactNode;
}

const TitleFrame: React.FC<TitleFrameProps> = ({ children, color }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <Separator className={cn(colorVariants({ color }), 'h-[3px] w-[65px]')} />
        <i className={cn(colorVariants({ color }), 'w-5 h-5 rounded-[5px] rotate-45')}></i>
        <Separator className={cn(colorVariants({ color }), 'h-[3px] w-[65px]')} />
      </div>
      {children}
      <div className="flex items-center gap-2">
        <Separator className={cn(colorVariants({ color }), 'h-[3px] w-[65px]')} />
        <i className={cn(colorVariants({ color }), 'w-5 h-5 rounded-[5px] rotate-45')}></i>
        <Separator className={cn(colorVariants({ color }), 'h-[3px] w-[65px]')} />
      </div>
    </div>
  );
};

export default TitleFrame;
