import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { serviceList } from './serviceList';
import TitleFrame from './title-frame';
import VShapeSide from './v-shape-side';

const BookingForm = ({ withVShape = false }: { withVShape?: boolean }) => {
  return (
    <>
      {withVShape && <VShapeSide foreground="#05312A" className="bg-#ECF4F3" />}
      <div className="w-full bg-#05312A flex justify-center pt-20 pb-24">
        <div className="w-2/3 rounded-3xl bg-#FFF000 py-16 relative">
          <TitleFrame>
            <h2 className="uppercase font-anton text-5xl py-2 text-#05312A">Booking Now</h2>
          </TitleFrame>
          <form className="pt-12 pl-52 pr-16 flex flex-col gap-10">
            <div className="grid grid-cols-2 justify-center items-center gap-5">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="name" className="font-medium text-sm">
                  Name
                </Label>
                <Input type="text" id="name" placeholder="Input your name" />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="phone" className="font-medium text-sm">
                  Phone
                </Label>
                <Input type="tel" id="phone" placeholder="Input your phone number" />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="datetime" className="font-medium text-sm">
                  Date & Time
                </Label>
                <Input type="datetime-local" id="datetime" placeholder="Choose Date & Time" />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="datetime" className="font-medium text-sm">
                  Select Service
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>-- Choose service --</SelectLabel>
                      {serviceList.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="uppercase w-full bg-#05312A">Book Now</Button>
          </form>
          <Image
            src="/images/chair.png"
            alt="Chair Image"
            width={402}
            height={530}
            className="absolute bottom-[-30px] left-[-180px] h-[450px] object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default BookingForm;
