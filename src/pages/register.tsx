import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { AvatarSquareIcon, LockIcon, MessageIcon, TelephoneIcon } from '@/components/icons';
import TitlePage from '@/components/TitlePage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateUser } from '@/hooks/query';
import { UserLayout } from '@/layout';
import { cn } from '@/libs/utils';

export default function Register() {
  const { mutate: createUser, isLoading } = useCreateUser();
  const router = useRouter();

  const registerSchema = z
    .object({
      name: z.string().min(1, { message: 'Name is required!' }).min(3, { message: 'Please input valid name!' }),
      email: z.string().min(1, { message: 'Email is required!' }).email({ message: 'Please input valid email!' }),
      phone: z
        .string()
        .min(1, { message: 'Phone number is required' })
        .regex(new RegExp(/^(?:\+62|0)[0-9\-]+$/g), { message: 'Please input valid phone number!' })
        .min(10, { message: 'Please input valid phone number!' })
        .max(14, { message: 'Please input valid phone number!' }),
      password: z.string().min(1, { message: 'Password is required!' }).min(8, { message: 'Password must be at least 8 characters!' }),
      confirmPassword: z.string().min(1, { message: 'Confirm password is required!' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords and confirmation password doesnt match',
      path: ['confirmPassword'],
    });
  type RegisterValidationSchema = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterValidationSchema> = async (data) => {
    createUser(data, {
      onSuccess: () => {
        toast.success('Registration successfull. Please login');
        router.push('/login');
      },
      onError: () => {
        toast.error('Something went wrong. Try again later!');
      },
    });
  };
  return (
    <>
      <UserLayout>
        <TitlePage>Register - Barberque</TitlePage>
        {/* Hero Header */}
        <div className="flex flex-col justify-between items-center w-full h-screen bg-[url('/images/hero-image-4.jpg')] bg-cover bg-center bg-no-repeat relative">
          <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-[#05312a]"></div>
          <div className="flex flex-col flex-1 justify-center items-center relative w-full">
            <div className="w-2/3 flex justify-center items-center rounded-xl overflow-hidden bg-white">
              <div className="w-2/6 bg-#05312A flex items-center justify-center rounded-xl py-10 px-8 h-full overflow-hidden">
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
                <form className="mt-9 flex flex-col gap-3 w-full" id="form-register" onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <AvatarSquareIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.name && 'text-red-500')} />
                    <Input
                      placeholder="Name"
                      type="text"
                      className={cn(
                        'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]',
                        errors.name && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                      )}
                      disabled={isLoading}
                      {...register('name')}
                    />
                    {errors.name && <p className="text-red-500 font-semibold text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="relative">
                    <MessageIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.email && 'text-red-500')} />
                    <Input
                      placeholder="Email"
                      type="email"
                      className={cn(
                        'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]',
                        errors.email && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                      )}
                      disabled={isLoading}
                      {...register('email')}
                    />
                    {errors.email && <p className="text-red-500 font-semibold text-xs">{errors.email.message}</p>}
                  </div>
                  <div className="relative">
                    <TelephoneIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.phone && 'text-red-500')} />
                    <Input
                      placeholder="Phone"
                      type="tel"
                      className={cn(
                        'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]',
                        errors.phone && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                      )}
                      disabled={isLoading}
                      {...register('phone')}
                    />
                    {errors.phone && <p className="text-red-500 font-semibold text-xs">{errors.phone.message}</p>}
                  </div>
                  <div className="relative">
                    <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.password && 'text-red-500')} />
                    <Input
                      placeholder="Password"
                      type="password"
                      className={cn(
                        'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]',
                        errors.password && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                      )}
                      disabled={isLoading}
                      {...register('password')}
                    />
                    {errors.password && <p className="text-red-500 font-semibold text-xs">{errors.password.message}</p>}
                  </div>
                  <div className="relative">
                    <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.confirmPassword && 'text-red-500')} />
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      className={cn(
                        'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f]',
                        errors.confirmPassword &&
                          'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                      )}
                      disabled={isLoading}
                      {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className="text-red-500 font-semibold text-xs">{errors.confirmPassword.message}</p>}
                  </div>
                </form>
                <Button
                  className="mt-10 uppercase rounded-[8px] bg-#05312A w-full font-semibold py-4 text-sm h-[48px]"
                  type="submit"
                  form="form-register"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    <>Register</>
                  )}
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
