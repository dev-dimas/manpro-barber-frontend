import { useGetAllService } from '@/hooks/query';
import { formatPrice } from '@/libs/utils';
import { Separator } from '../ui/separator';
import TitleFrame from './title-frame';

const ServiceItem = ({ serviceName, detail, price }: { serviceName: string; detail?: string; price: string }) => {
  return (
    <>
      <div className="flex justify-between items-center w-full pt-4 pb-2 text-white">
        <div>
          <p className="font-anton text-2xl">{serviceName}</p>
          {detail && <p className="text-xs">{detail}</p>}
        </div>
        <p className="font-anton text-3xl uppercase">{price}</p>
      </div>
      <Separator className="h-[3px] bg-white" />
    </>
  );
};

const Pricelist = () => {
  const { data: res, isError } = useGetAllService();

  if (isError || !res?.data?.length) return null;

  return (
    <div className="w-full pt-20 pb-32 flex flex-col items-center">
      <TitleFrame color={'yellow'}>
        <h2 className="uppercase font-anton text-5xl py-2 text-white">Price List</h2>
      </TitleFrame>
      <div className="w-2/3 flex flex-col justify-center items-center">
        {res.data.map((service: any) => (
          <ServiceItem key={service.id} serviceName={service.name} detail={service.information} price={formatPrice(service.price)} />
        ))}
      </div>
    </div>
  );
};

export default Pricelist;
