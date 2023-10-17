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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
          centuries,
        </p>
        <p className="text-white text-base text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
          centuries,
        </p>
      </div>
    </div>
  );
};

export default OurStory;
