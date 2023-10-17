import TitleFrame from './title-frame';
import VShapeSide from './v-shape-side';

const OurServices = () => {
  return (
    <>
      <VShapeSide foreground="#ECF4F3" />
      <div className="w-full flex flex-col items-center bg-#ECF4F3 py-16">
        <TitleFrame color="yellow">
          <h2 className="uppercase font-anton text-5xl py-2 text-#05312A">Our Services</h2>
        </TitleFrame>
        <div className="w-2/3 flex justify-center items-center pt-28">
          <div className="flex gap-4 flex-wrap">
            <div className="w-[229px] h-[307px] bg-[#D9D9D9]"></div>
            <div className="w-[229px] h-[307px] bg-[#D9D9D9]"></div>
            <div className="w-[229px] h-[307px] bg-[#D9D9D9]"></div>
            <div className="w-[229px] h-[307px] bg-[#D9D9D9]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurServices;
