import Head from 'next/head';
import Image from 'next/image';
import TitleFrame from '@/components/home/title-frame';
import { LocationIcon, MapIcon } from '@/components/icons';
import { UserLayout } from '@/layout';

const Location = () => {
  return (
    <UserLayout>
      <Head>
        <title>Location - Barberque</title>
      </Head>
      {/* Hero Header */}
      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-4.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[#05312a]"></div>
        <div className="flex flex-col flex-1 justify-center items-center relative">
          <h1 className="uppercase font-anton text-8xl text-#FFF000 z-[1]">Location Cutboss</h1>
          <p className="uppercase font-bold text-2xl text-white z-[1]">Cutboss Barbershop</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex justify-center my-[180px]">
        <div className="w-2/3 flex flex-col">
          <TitleFrame color={'yellow'}>
            <h2 className="uppercase font-anton text-5xl py-2 text-#ECF4F3">Our Location</h2>
          </TitleFrame>
          <div className="w-full flex mt-10 gap-12 items-center">
            <div className="w-1/2">
              {/* TODO: Replace with real maps */}
              <div className="w-full min-h-[400px] bg-blue-500 rounded-3xl"></div>
            </div>
            <div className="w-1/2 font-medium flex flex-col gap-6 text-white">
              <div className="flex flex-col gap-6">
                <div className="flex gap-2">
                  <MapIcon className="w-5 h-auto text-#FFF000" />
                  <span className="text-#FFF000 text-xl">Address :</span>
                </div>
                <p className="text-base">
                  <span className="text-#FFF000">CUTBOSS BARBERSHOP,</span> Jl. Raya Kludan No.26, RT.04/RW.2, Kludan, Kec. Tanggulangin, Kabupaten
                  Sidoarjo, Jawa Timur 61272
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex gap-2">
                  <LocationIcon className="w-5 h-auto text-#FFF000" />
                  <span className="text-#FFF000 text-xl">Contact :</span>
                </div>
                <p className="font-normal">Contact Customer Care 0812 - 1963 - 1730</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Location;
