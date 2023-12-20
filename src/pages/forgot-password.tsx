import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { LockIcon, MessageIcon } from '@/components/icons';
import TitlePage from '@/components/TitlePage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/hooks/query';
import { UserLayout } from '@/layout';
import { cn } from '@/libs/utils';

export default function ForgotPassword() {
  const { mutate: forgotPassword, isLoading } = useForgotPassword();
  const router = useRouter();

  const forgotPasswordSchema = z
    .object({
      email: z.string().min(1, { message: 'Email is required!' }).email('Please input valid email!'),
      newPassword: z.string().min(1, { message: 'New password is required!' }).min(8, { message: 'New password must be at least 8 characters!' }),
      confirmPassword: z.string().min(1, { message: 'Confirmation password is required!' }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'New passwords and confirmation password doesnt match',
      path: ['confirmPassword'],
    });
  type ForgotPasswordValidationSchema = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValidationSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordValidationSchema> = async (data) => {
    forgotPassword(data, {
      onSuccess: () => {
        toast.success('Change password success!. Please login');
        router.push('/login');
      },
      onError: () => {
        toast.error('Failed to change password!. Try again later');
      },
    });
  };

  return (
    <UserLayout>
      <TitlePage>Forgot Password - Barberque</TitlePage>
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
              <h1 className="text-2xl font-extrabold text-#05312A">Forgot Password</h1>
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
                    disabled={isLoading}
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 font-semibold text-xs">{errors.email.message}</p>}
                </div>
                <div className="relative">
                  <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.newPassword && 'text-red-500')} />
                  <Input
                    placeholder="New Password"
                    type="password"
                    className={cn(
                      'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f] mb-4',
                      errors.newPassword && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                    )}
                    disabled={isLoading}
                    {...register('newPassword')}
                  />
                  {errors.newPassword && <p className="text-red-500 font-semibold text-xs">{errors.newPassword.message}</p>}
                </div>
                <div className="relative">
                  <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.confirmPassword && 'text-red-500')} />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className={cn(
                      'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#2f2f2f] mb-4',
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
                className="uppercase rounded-[8px] bg-#05312A w-full font-semibold py-4 text-sm h-[48px]"
                type="submit"
                form="form-login"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
