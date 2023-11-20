import Head from 'next/head';
import Pricelist from '@/components/home/pricelist';
import ServiceCardList from '@/components/services/service-card-list';
import { UserLayout } from '@/layout';

const Services = () => {
  return (
    <UserLayout>
      <Head>
        <title>Services - Barberque</title>
      </Head>
      {/* Hero Header */}
      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-4.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[#05312a]"></div>
        <div className="flex flex-col flex-1 justify-center items-center relative">
          <h1 className="uppercase font-anton text-8xl text-#FFF000 z-[1]">Services</h1>
          <p className="uppercase font-bold text-2xl text-white z-[1]">Cutboss</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center justify-center my-[180px]">
        <div className="w-2/3 flex flex-col pb-10">
          <ServiceCardList />
        </div>
        <Pricelist />
      </div>
    </UserLayout>
  );
};

export default Services;
