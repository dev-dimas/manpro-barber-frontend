import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { LockIcon, MessageIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserLayout } from '@/layout';
import { cn } from '@/libs/utils';

export default function Login() {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const router = useRouter();
  const dummyAccount = { email: 'barberque@user.com', password: 'daijoubuu' };

  const loginSchema = z.object({
    email: z.string().min(1, { message: 'Email is required!' }).email('Please input valid email!'),
    password: z.string().min(8, { message: 'Password must be at least 8 characters!' }),
  });
  type LoginValidationSchema = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginValidationSchema> = (data) => {
    if (data.email == dummyAccount.email && data.password == dummyAccount.password) {
      Cookies.set('accessToken', crypto.randomUUID());
    } else {
      setError('email', { message: 'Email or password is incorrect!' });
    }
  };

  if (Cookies.get('accessToken')) router.push('/user/dashboard');

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
                <form className="mt-9 flex flex-col gap-3 w-full" id="form-login" onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <MessageIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.email && 'text-red-500')} />
                    <Input
                      placeholder="Email"
                      type="email"
                      className={cn(
                        'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f] mb-4',
                        errors.email && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                      )}
                      {...register('email')}
                    />
                    {errors.email && <p className="text-red-500 font-semibold text-xs">{errors.email.message}</p>}
                  </div>
                  <div className="relative">
                    <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.password && 'text-red-500')} />
                    <Input
                      placeholder="Password"
                      type="password"
                      className={cn(
                        'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f] mb-4',
                        errors.password && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                      )}
                      {...register('password')}
                    />
                    {errors.password && <p className="text-red-500 font-semibold text-xs">{errors.password.message}</p>}
                  </div>
                </form>
                <div className="flex justify-between w-full my-[14px] text-xs">
                  <div className="flex items-center space-x-1">
                    <Switch id="remember-me" checked={isRememberMe} onCheckedChange={() => setIsRememberMe(!isRememberMe)} />
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
