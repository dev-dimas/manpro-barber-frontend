import Head from 'next/head';
import BlogCardList from '@/components/blog/blog-card-list';
import Pricelist from '@/components/home/pricelist';
import { UserLayout } from '@/layout';

const Blog = () => {
  return (
    <UserLayout>
      <Head>
        <title>Blog - Barberque</title>
      </Head>
      {/* Hero Header */}
      <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-4.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[#05312a]"></div>
        <div className="flex flex-col flex-1 justify-center items-center relative">
          <h1 className="uppercase font-anton text-8xl text-#FFF000 z-[1]">Blog</h1>
          <p className="uppercase font-bold text-2xl text-white z-[1]">Cutboss Barbershop</p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center justify-center my-[180px]">
        <div className="w-2/3 flex flex-col">
          <BlogCardList />
        </div>
      </div>
    </UserLayout>
  );
};

export default Blog;
