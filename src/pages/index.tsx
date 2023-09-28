import Head from 'next/head';
import HeroInfo from '@/components/home/hero-info';
import { Separator } from '@/components/ui/separator';
import Layout from '@/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Barberque</title>
      </Head>

      {/* Hero Header */}
      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image.jpg')] bg-cover bg-center bg-no-repeat bg-[rgba(0,0,0,0.6)] bg-blend-multiply">
        <div className="flex flex-col flex-1 justify-center items-center">
          <h1 className="uppercase font-rye text-[64px] text-#C6922B">Barberque Apps</h1>
          <p className="uppercase font-bold text-2xl text-white">Pos & Online Queue</p>
        </div>
        <div className="bg-black w-full h-[146px] flex justify-center items-center">
          <div className="w-2/3 flex justify-around">
            <HeroInfo />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-#20201E flex justify-center">
        <div className="w-2/3 py-[180px]">
          {/* Our Story */}
          <div className="flex flex-col">
            <div className="flex gap-2">
              <i className="bg-#C6922B w-5 h-5 block rounded-[5px] rotate-45"></i>
              <p className="font-bold text-xl text-white">Our Story</p>
            </div>
            <div className="flex items-baseline gap-4">
              <p className="font-rye text-[40px] text-#C6922B">Tentang Kami</p>
              <Separator className="h-[2px] bg-#C6922B flex-1" />
            </div>
            <div className="mt-[68px] flex gap-[102px]">
              <p className="text-white text-xl text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </p>
              <p className="text-white text-xl text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
