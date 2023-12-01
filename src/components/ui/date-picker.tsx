import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';

export default function DatePicker({
  today,
  date,
  setDate,
}: {
  today: Date;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('w-[307px] justify-between text-left font-normal', !date && 'text-muted-foreground')}>
          {date ? format(date, 'PPP') : <span>Choose date</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            selectedDate?.getTime() !== date?.getTime() && setDate(selectedDate);
          }}
          initialFocus
          disabled={{ before: today }}
          required
          classNames={{
            day_selected: 'bg-#05312A text-white hover:bg-#05312A hover:text-white focus:bg-#05312A focus:text-white',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
