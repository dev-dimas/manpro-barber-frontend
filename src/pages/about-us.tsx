import Head from 'next/head';
import Layout from '@/layout';

const AboutUs = () => {
  return (
    <Layout>
      <Head>
        <title>About Us - Barberque</title>
      </Head>

      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-3.jpg')] bg-cover bg-center bg-no-repeat bg-[rgba(5,49,42,0.50)] bg-blend-overlay">
        <div className="flex flex-col flex-1 justify-center items-center">
          <h1 className="uppercase font-anton text-8xl text-#FFF000">Cut Like a Boss</h1>
          <p className="uppercase font-bold text-2xl text-white">Cutboss Barbershop</p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
