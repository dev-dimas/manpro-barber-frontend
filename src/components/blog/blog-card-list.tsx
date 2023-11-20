import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/libs/utils';
import blogPost from '@/pages/blog/blog-post.json';

export default function BlogCardList() {
  return (
    <div className="flex gap-4 w-full">
      {blogPost.map((post, index) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
          <div className={cn(index % 2 == 1 ? 'bg-#FFF000' : 'bg-white', 'py-3 px-2 rounded-[20px]')}>
            <Image src={'/images/blog-image-1.png'} alt="Blog Post Image" width={291} height={194} className="rounded-[20px] w-full" />
            <span className="mt-2 font-medium text-[10px] text-[#b3b3b3]">
              {post.publishedDate.month}, {post.publishedDate.date} - {post.author}
            </span>
            <p className="font-bold text-#05312A mt-0">{post.title}</p>
            <p className="text-#05312A text-sm text-justify mt-2">{post.content.split(' ').splice(0, 91).join(' ')}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
