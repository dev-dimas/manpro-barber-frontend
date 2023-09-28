import Image from 'next/image';

const FooterImage = () => {
  return (
    <div className="flex gap-4 pt-[50px] pb-9">
      <div className="w-[229px] h-[137px] overflow-hidden flex items-center bg-black">
        <Image src="/images/footer-image-1.jpg" alt="Footer Image" width={500} height={500} className="opacity-50" />
      </div>
      <div className="w-[229px] h-[137px] overflow-hidden flex items-center bg-black">
        <Image src="/images/footer-image-2.jpg" alt="Footer Image" width={500} height={500} className="opacity-50" />
      </div>
      <div className="w-[229px] h-[137px] overflow-hidden flex items-center bg-black">
        <Image src="/images/footer-image-3.jpg" alt="Footer Image" width={500} height={500} className="opacity-50" />
      </div>
      <div className="w-[229px] h-[137px] overflow-hidden flex items-center bg-black">
        <Image src="/images/footer-image-4.jpg" alt="Footer Image" width={500} height={500} className="opacity-50" />
      </div>
    </div>
  );
};

export default FooterImage;
