import TitlePage from '@/components/TitlePage';
import { UserLayout } from '@/layout';

const AboutUs = () => {
  return (
    <UserLayout>
      <TitlePage>About Us - Barberque</TitlePage>
      {/* Hero Header */}
      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-3.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[#05312a]"></div>
        <div className="flex flex-col flex-1 justify-center items-center relative">
          <h1 className="uppercase font-anton text-8xl text-#FFF000 z-[1]">Cut Like a Boss</h1>
          <p className="uppercase font-bold text-2xl text-white z-[1]">Cutboss Barbershop</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex justify-center my-[180px]">
        <div className="w-2/3 bg-[#d9d9d9] flex justify-center">
          <div className="w-1/2 bg-#05312A text-white text-center py-12 px-3 flex flex-col gap-[13px]">
            <h2 className="font-anton text-5xl pb-2">About Me</h2>
            <p className="text-sm">
              Cutboss Barbershop is the ultimate destination for men who prioritize their appearance and hair health. With over a decade of
              experience, we have become the trusted center for thousands of customers seeking the latest hair trends and high-quality services. At
              Cutboss, our experienced barbers not only master the latest men&apos;s hair trends but also understand the uniqueness of each customer.
              We prioritize customer satisfaction by providing personalized services and using the best-quality products. The relaxed and friendly
              atmosphere inside our barbershop creates an experience that is not just about a haircut but also about relaxation and confidence. We are
              not just cutting hair; we are creating art that reflects the unique personality of each customer. So, if you&apos;re looking for more
              than just an ordinary haircut, come to Cutboss Barbershop, where style meets expertise to create an unforgettable haircut experience.
            </p>
            <p className="text-#FFF000 font-ooohBaby text-2xl">Cutboss Barbershop</p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default AboutUs;
