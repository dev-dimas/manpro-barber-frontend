import TitleFrame from '@/components/home/title-frame';
import { LocationIcon, MapIcon } from '@/components/icons';
import TitlePage from '@/components/TitlePage';
import { UserLayout } from '@/layout';

const Location = () => {
  return (
    <UserLayout>
      <TitlePage>Location - Barberque</TitlePage>
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
              <div className="w-full rounded-3xl overflow-hidden">
                <iframe
                  width="100%"
                  height="371"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Jl.%20Raya%20Kludan%20No.26,%20RT.04/RW.2,%20Kludan,%20Kec.%20Tanggulangin,%20Kabupaten%20Sidoarjo,%20Jawa%20Timur%2061272+(Cutboss%20Barbershop)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
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
