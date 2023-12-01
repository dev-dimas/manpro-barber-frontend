import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosArrowForward } from 'react-icons/io';
import { LuHome } from 'react-icons/lu';

export default function Breadcrumb() {
  const router = useRouter();
  const { pathname } = router;
  const userRoutes = [
    { href: '/user/dashboard', name: 'Dashboard' },
    { href: '/user/transaction', name: 'Transaction History' },
    { href: '/user/profile', name: 'Profile' },
  ];

  const currentRoute = userRoutes.find((route) => route.href == pathname);

  return (
    <>
      <div className="text-xs flex items-center gap-1">
        <Link href={'/'}>
          <LuHome />
        </Link>
        <IoIosArrowForward />
        <Link href={'/user/dashboard'}>Akun</Link>
        <IoIosArrowForward />
        <Link href={currentRoute?.href || '/'}>{currentRoute?.name}</Link>
      </div>
      <p className="font-anton text-2xl mt-2 pb-3">{currentRoute?.name}</p>
    </>
  );
}
