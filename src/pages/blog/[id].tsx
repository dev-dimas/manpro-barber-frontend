import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AvatarCircleIcon, ClockIcon } from '@/components/icons';
import { UserLayout } from '@/layout';
import blogPost from '@/pages/blog/blog-post.json';

export default function BlogPost() {
  const router = useRouter();
  const post = blogPost.find((post) => post.id == router.query.id);

  if (post) {
    return (
      <UserLayout>
        <Head>
          <title>{post.title} - Barberque</title>
        </Head>
        <div className="w-full flex justify-center">
          <div className="w-2/3 mt-10">
            <Image src={'/images/blog-image-1.png'} alt="Blog Post Image" width={960} height={587} className="w-full rounded-[30px]" />
            <div className="w-full flex justify-end gap-4 text-white mt-7">
              <div className="flex gap-2  items-center">
                <AvatarCircleIcon className="w-4 h-auto" />
                <span className="text-sm">Admin</span>
              </div>
              <div className="flex gap-2 items-center">
                <ClockIcon className="w-4 h-auto" />
                <span className="text-sm">
                  {post.publishedDate.month} {post.publishedDate.date}
                </span>
              </div>
            </div>
            <h1 className="text-#FFF000 text-3xl font-bold mt-2">{post.title}</h1>
            <p className="text-sm text-white text-justify mt-10">{post.content}</p>
          </div>
        </div>
      </UserLayout>
    );
  } else {
    return (
      <UserLayout>
        <Head>
          <title>Blog Post Not Found - Barberque</title>
        </Head>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-2/3 bg-white text-center min-h-[70vh] rounded-2xl flex justify-center items-center">
            <h1 className="text-3xl font-bold uppercase">Blog post not found! :(</h1>
          </div>
        </div>
      </UserLayout>
    );
  }
}
