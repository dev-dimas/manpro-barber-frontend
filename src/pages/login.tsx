import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserLayout } from '@/layout';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Barberque</title>
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
                <h1 className="text-2xl font-extrabold text-#05312A">Login to Your Account</h1>
                <form className="mt-9 flex flex-col gap-3 w-full" id="form-login">
                  <div className="relative">
                    <Image src={'/icons/sms.svg'} alt="Email icons" height={20} width={20} className="absolute h-[48px] left-[14px]" />
                    <Input
                      placeholder="Email"
                      type="email"
                      className="h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Image src={'/icons/lock.svg'} alt="Password icons" height={20} width={20} className="absolute h-[48px] left-[14px]" />
                    <Input
                      placeholder="Password"
                      type="password"
                      className="h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]"
                      required
                    />
                  </div>
                </form>
                <div className="flex justify-between w-full my-[14px] text-xs">
                  <div className="flex items-center space-x-1">
                    <Switch id="remember-me" />
                    <Label htmlFor="remember-me" className="text-xs">
                      Remember me
                    </Label>
                  </div>
                  <span className="font-semibold cursor-pointer">Forgot Password?</span>
                </div>
                <Button className="uppercase rounded-[8px] bg-#05312A w-full font-semibold py-4 text-sm h-[48px]" type="submit" form="form-login">
                  Login
                </Button>
                <span className="mt-2 pb-10 text-xs">
                  Don&apos;t have an account?{' '}
                  <Link href={'/register'} className="font-bold">
                    Register here
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
