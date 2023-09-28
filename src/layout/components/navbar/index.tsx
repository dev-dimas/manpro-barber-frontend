import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { montserrat, rye } from '@/libs/font';
import { cn } from '@/libs/utils';
import styles from '@/styles/navbar.module.css';
import { navbarLink, TNavbarLink } from './navbar-link';

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <header className={cn(rye.variable, montserrat.variable, 'w-full flex flex-col items-center absolute top-8 gap-4 font-montserrat')}>
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
          <Button className="uppercase bg-#C6922B rounded-none hover:bg-#D8A94C px-[38px] py-3 text-sm font-semibold">Booking</Button>
        </nav>
        <div className="text-white flex flex-col items-center">
          <span className="font-rye text-xl uppercase">Barberque</span>
          <span className="text-[5px] font-semibold text-#C6922B leading-[6px]">Top Quality in Men&apos;s Grooming</span>
        </div>
      </header>
    </>
  );
};

export default Navbar;
