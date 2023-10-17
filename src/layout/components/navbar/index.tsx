import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { montserrat } from '@/libs/font';
import { cn } from '@/libs/utils';
import styles from '@/styles/navbar.module.css';
import { navbarLink, TNavbarLink } from './navbar-link';

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <header className={cn(montserrat.variable, 'w-full flex flex-col items-center absolute top-8 gap-4 font-montserrat')}>
        <nav className="flex w-2/3 justify-between items-center">
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
                <Link key={index} href={link.href} className={pathname === link.href ? styles.navlinkActive : styles.navlink}>
                  {link.name}
                </Link>
              )
          )}
          <Button className="uppercase text-black bg-#FFF000 rounded-[5px] hover:bg-#DBD148 px-[38px] py-3 text-sm font-semibold">Booking</Button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
