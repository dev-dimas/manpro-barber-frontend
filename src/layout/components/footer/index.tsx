import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { montserrat } from '@/libs/font';
import { cn } from '@/libs/utils';
import FooterImage from './footer-image';

const Footer = () => {
  return (
    <footer className={cn(montserrat.variable, 'font-montserrat bg-#02221D mt-20')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="bg-#05312A">
        <path d="M0 0L720 73.9556L1440 0V512H0V0Z" fill="#02221D" />
      </svg>
      <div className="flex flex-col items-center justify-center mt-[-90px]">
        <div className="w-2/3 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image src="/images/logo-barberque.png" alt="Logo Barberque" width={200} height={114} />
          </div>
          <FooterImage />
          <div className="flex gap-4 text-#FFF000 text-sm pb-16">
            <Button className="rounded-none w-[147px] bg-transparent border-#FFF000 hover:bg-#FFF000" variant="outline" asChild>
              <a href="#">Instagram</a>
            </Button>
            <Button className="rounded-none w-[147px] bg-transparent border-#FFF000 hover:bg-#FFF000" variant="outline" asChild>
              <a href="#">Facebook</a>
            </Button>
            <Button className="rounded-none w-[147px] bg-transparent border-#FFF000 hover:bg-#FFF000" variant="outline" asChild>
              <a href="#">Twitter</a>
            </Button>
            <Button className="rounded-none w-[147px] bg-transparent border-#FFF000 hover:bg-#FFF000" variant="outline" asChild>
              <a href="#">Tiktok</a>
            </Button>
          </div>
        </div>
        <Separator className="bg-white" />
        <div className="py-6 text-sm font-medium text-white w-2/3">
          <p className="text-center">Copyright © 2023 Barberque by CUTBOSS BARBERSHOP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
