import Lottie from 'lottie-react';
import sadMoji from '../../public/sadmoji.json';

const MobilePage = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center pb-28 px-2 bg-white">
      <Lottie animationData={sadMoji} loop={true} className="h-28" />
      <h1 className="font-semibold text-lg text-center">Mobile view is not yet implemented. Please use desktop.</h1>
    </div>
  );
};

export default MobilePage;
