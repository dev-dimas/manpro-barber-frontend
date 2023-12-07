import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AvatarSquareIcon, LockIcon, MessageIcon, TelephoneIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserLayout } from '@/layout';

export default function Register() {
  return (
    <>
      <Head>
        <title>Register - Barberque</title>
      </Head>
      <UserLayout>
        {/* Hero Header */}
        <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-4.jpg')] bg-cover bg-center bg-no-repeat relative">
          <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[#05312a]"></div>
          <div className="flex flex-col flex-1 justify-center items-center relative w-full">
            <div className="w-2/3 flex justify-center items-center rounded-xl overflow-hidden bg-white">
              <div className="w-2/6 bg-#05312A flex items-center justify-center rounded-xl py-10 px-8 h-full">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="h-3/5 max-h-[210px] aspect-square bg-#FFF000 rounded-full flex items-center relative">
                    <Image
                      src={'/images/chair.png'}
                      alt="Chair image"
                      width={188}
                      height={250}
                      className="h-[120%] w-full object-cover absolute left-[-15px]"
                    />
                  </div>
                  <div className="h-3/5 max-w-[37px] w-full">
                    <div className="max-h-[37px] h-1/5 aspect-square bg-#FFF000 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="w-4/6 flex flex-col items-center justify-center py-10 px-8">
                <h1 className="text-2xl font-extrabold text-#05312A">Create New Account</h1>
                <form className="mt-9 flex flex-col gap-3 w-full" id="form-register">
                  <div className="relative">
                    <AvatarSquareIcon className="w-5 absolute h-[48px] left-[14px] text-#292D32" />
                    <Input
                      placeholder="Name"
                      type="text"
                      className="h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <MessageIcon className="w-5 absolute h-[48px] left-[14px] text-#292D32" />
                    <Input
                      placeholder="Email"
                      type="email"
                      className="h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <TelephoneIcon className="text-#292D32 w-5 h-[48px] absolute left-[14px]" />
                    <Input
                      placeholder="Phone"
                      type="tel"
                      className="h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <LockIcon className="w-5 absolute h-[48px] left-[14px] text-#292D32" />
                    <Input
                      placeholder="Password"
                      type="password"
                      className="h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <LockIcon className="w-5 absolute h-[48px] left-[14px] text-#292D32" />
                    <Input
                      placeholder="Confirm Password"
                      type=" requiredpassword"
                      className="h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]"
                      required
                    />
                  </div>
                </form>
                <Button
                  className="mt-10 uppercase rounded-[8px] bg-#05312A w-full font-semibold py-4 text-sm h-[48px]"
                  type="submit"
                  form="form-register"
                >
                  Login
                </Button>
                <span className="mt-2 text-xs">
                  Already have an account?{' '}
                  <Link href={'/login'} className="font-bold">
                    Login here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
