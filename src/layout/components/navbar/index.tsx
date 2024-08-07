import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/store/useUser';
import { montserrat } from '@/libs/font';
import { cn } from '@/libs/utils';
import styles from '@/styles/navbar.module.css';
import { navbarLink, TNavbarLink } from './navbar-link';
import UserButton from './UserButton';

const Navbar = () => {
  const user = useUser((state) => state.userData);
  const router = useRouter();
  const { pathname } = router;
  const listSolidNavbarUrl = ['/booking', '/user', '/blog/'];

  return (
    <>
      <header
        className={cn(
          montserrat.variable,
          'w-full flex flex-col items-center absolute top-8 gap-4 font-montserrat',
          listSolidNavbarUrl.find((url) => pathname.startsWith(url)) && 'bg-#02221D top-0 static py-8'
        )}
      >
        <nav className="flex w-2/3 justify-between items-center z-[1]">
          {navbarLink.map(
            (link: TNavbarLink, index: number) =>
              index < 3 && (
                <Link key={index} href={link.href} className={pathname === link.href ? styles.navlinkActive : styles.navlink}>
                  {link.name}
                </Link>
              )
          )}
          <Image src="/images/logo-barberque.png" alt="Logo Barberqueue" width={100} height={100} className="mx-[-40px]" />
          {navbarLink.map(
            (link: TNavbarLink, index: number) =>
              index >= 3 && (
                <Link key={index} href={link.href} className={pathname.startsWith(link.href) ? styles.navlinkActive : styles.navlink}>
                  {link.name}
                </Link>
              )
          )}
          {user ? (
            <UserButton />
          ) : (
            <Button className="uppercase text-black bg-#FFF000 rounded-[5px] hover:bg-#DBD148 px-[38px] py-3 text-sm font-semibold" asChild>
              <Link href={'/login'}>Login</Link>
            </Button>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
