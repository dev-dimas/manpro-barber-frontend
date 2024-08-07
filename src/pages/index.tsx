import BookingForm from '@/components/home/booking-form';
import HeroInfo from '@/components/home/hero-info';
import OurBarber from '@/components/home/our-barber';
import OurServices from '@/components/home/our-services';
import OurStory from '@/components/home/our-story';
import Pricelist from '@/components/home/pricelist';
import TitlePage from '@/components/TitlePage';
import { UserLayout } from '@/layout';

export default function Home() {
  return (
    <UserLayout>
      <TitlePage>Barberque</TitlePage>

      {/* Hero Header */}
      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-1.jpg')] bg-cover bg-center bg-no-repeat bg-[rgba(5,49,42,0.50)] bg-blend-overlay">
        <div className="flex flex-col flex-1 justify-center items-center">
          <h1 className="uppercase font-anton text-8xl text-#FFF000">Barberque Apps</h1>
          <p className="uppercase font-bold text-2xl text-white">Pos & Online Queue</p>
        </div>
        <div className="bg-#02221D w-full h-[146px] flex justify-center items-center">
          <div className="w-2/3 flex justify-around">
            <HeroInfo />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-#05312A flex flex-col items-center">
        {/* Our Story */}
        <div className="w-2/3 py-[180px]">
          <OurStory />
        </div>
        {/* Our Services */}
        <OurServices />
        {/* Booking Now */}
        <BookingForm withVShape />
        {/* OurBarber */}
        <OurBarber />
        {/* Pricelist */}
        <Pricelist />
        <div className="bg-#05312A h-[500px]"></div>
      </div>
    </UserLayout>
  );
}
