import Head from 'next/head';
import { UserLayout } from '@/layout';

const AboutUs = () => {
  return (
    <UserLayout>
      <Head>
        <title>About Us - Barberque</title>
      </Head>
      {/* Hero Header */}
      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-3.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[#05312a]"></div>
        <div className="flex flex-col flex-1 justify-center items-center z-[1]">
          <h1 className="uppercase font-anton text-8xl text-#FFF000">Cut Like a Boss</h1>
          <p className="uppercase font-bold text-2xl text-white">Cutboss Barbershop</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex justify-center my-[180px]">
        <div className="w-2/3 bg-[#d9d9d9] flex justify-center">
          <div className="w-1/2 bg-#05312A text-white text-center py-12 px-3 flex flex-col gap-[13px]">
            <h2 className="font-anton text-5xl pb-2">About Me</h2>
            <p className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
              five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum.
            </p>
            <p className="text-#FFF000 font-ooohBaby text-2xl">Cutboss Barbershop</p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default AboutUs;
