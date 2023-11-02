import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/libs/utils';
import { sideNavbarLink } from './side-navbar-link';

const SideNavbar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <Image src="/images/logo-barberque.png" alt="Logo barberque" width={175} height={100} />
      <ul className="flex flex-col gap-10 mt-16">
        {sideNavbarLink.map((link) => (
          <li key={link.name} className={cn('font-medium text-2xl', link.href == pathname ? 'text-#FFF000' : 'text-#ECF4F3')}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideNavbar;
