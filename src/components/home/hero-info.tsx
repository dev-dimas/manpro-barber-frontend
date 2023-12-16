import { ClockIcon, LocationIcon, TelephoneIcon } from '../icons';

const HeroInfo = () => {
  return (
    <>
      <div className="flex gap-4">
        <TelephoneIcon className="text-#FFF000 w-[30px] h-auto" />
        <div className="flex flex-col">
          <p className="text-white text-sm">Layanan Pelanggan</p>
          <p className="text-white text-xl font-bold">0838 - 5748 - 2765</p>
        </div>
      </div>
      <div className="flex gap-4">
        <LocationIcon className="text-#FFF000 w-[30px] h-auto" />
        <div className="flex flex-col">
          <p className="text-white text-sm">Lokasi</p>
          <p className="text-white text-xl font-bold">Surabaya, Jawa Timur</p>
        </div>
      </div>
      <div className="flex gap-4">
        <ClockIcon className="text-#FFF000 w-[30px] h-auto" />
        <div className="flex flex-col">
          <p className="text-white text-sm">Buka Setiap Hari</p>
          <p className="text-white text-xl font-bold">10.00 - 21.00</p>
        </div>
      </div>
    </>
  );
};

export default HeroInfo;
