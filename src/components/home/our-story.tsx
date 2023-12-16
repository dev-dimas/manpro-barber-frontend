import { Separator } from '../ui/separator';

const OurStory = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <i className="bg-#FFF000 w-5 h-5 block rounded-[5px] rotate-45"></i>
        <p className="font-bold text-xl text-white">Our Story</p>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="font-anton text-[48px] text-#FFF000 pr-[55px]">About Us</h2>
        <Separator className="h-[2px] bg-#FFF000 flex-1" />
      </div>
      <div className="mt-[68px] flex gap-[102px]">
        <p className="text-white text-base text-justify">
          Cutboss Barbershop is the ultimate destination for men who prioritize their appearance and hair health. With over a decade of experience, we
          have become the trusted center for thousands of customers seeking the latest hair trends and high-quality services. At Cutboss, our
          experienced barbers not only master the latest men&apos;s hair trends but also understand the uniqueness of each customer. We prioritize
          customer satisfaction by providing personalized services and using the best-quality products.
        </p>
        <p className="text-white text-base text-justify">
          The relaxed and friendly atmosphere inside our barbershop creates an experience that is not just about a haircut but also about relaxation
          and confidence. We are not just cutting hair; we are creating art that reflects the unique personality of each customer. So, if you&apos;re
          looking for more than just an ordinary haircut, come to Cutboss Barbershop, where style meets expertise to create an unforgettable haircut
          experience.
        </p>
      </div>
    </div>
  );
};

export default OurStory;
