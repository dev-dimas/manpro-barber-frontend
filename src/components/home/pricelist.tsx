import { Separator } from '../ui/separator';
import { serviceList } from './serviceList';
import TitleFrame from './title-frame';

const ServiceItem = ({ serviceName, detail, price }: { serviceName: string; detail?: string; price: string }) => {
  return (
    <>
      <div className="flex justify-between items-center w-full pt-4 pb-2">
        <div>
          <p className="font-anton text-2xl text-black">{serviceName}</p>
          {detail && <p className="text-xs text-black">{detail}</p>}
        </div>
        <p className="font-anton text-3xl text-black">{price}</p>
      </div>
      <Separator className="h-[3px] bg-#05312A" />
    </>
  );
};

const Pricelist = () => {
  return (
    <div className="bg-#ECF4F3 w-full pt-20 pb-32 flex flex-col items-center">
      <TitleFrame>
        <h2 className="uppercase font-anton text-5xl py-2 text-#05312A">Price List</h2>
      </TitleFrame>
      <div className="w-2/3 flex flex-col justify-center items-center">
        {serviceList.map((item) => (
          <ServiceItem key={item.id} serviceName={item.name} detail={item.description} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default Pricelist;
