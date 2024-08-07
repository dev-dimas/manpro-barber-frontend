import EmployeeCard from './employee-card';
import TitleFrame from './title-frame';

const OurBarber = () => {
  return (
    <div className="flex justify-center w-full h-[859px] bg-[url('/images/hero-image-2.jpg')] bg-cover bg-center bg-no-repeat bg-[rgba(5,49,42,0.70)] bg-blend-overlay">
      <div className="w-2/3 flex flex-col py-32 justify-center items-center gap-4">
        <TitleFrame color="yellow">
          <h2 className="uppercase font-anton text-5xl py-2 text-#ECF4F3">Our Barber</h2>
        </TitleFrame>
        <p className="text-base text-center text-white max-w-[543px]">
          Trust your hair to our expert barbers for a personalized <br />
          and top-notch experience!
        </p>
        {/* Profile Picture */}
        <div className="flex gap-4 pt-5">
          <EmployeeCard imgSrc="/images/employee-1.jpg" name="Denny" description="Barberman" />
          <EmployeeCard imgSrc="/images/employee-2.jpg" name="Fathola" description="Barberman" className="bg-#FFF000" />
          <EmployeeCard imgSrc="/images/employee-3.jpg" name="Helos" description="Barberman" />
        </div>
      </div>
    </div>
  );
};

export default OurBarber;
