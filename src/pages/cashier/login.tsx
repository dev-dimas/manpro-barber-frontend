import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { LockIcon, MessageIcon } from '@/components/icons';
import TitlePage from '@/components/TitlePage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginEmployee } from '@/hooks/query';
import { CashierLayout } from '@/layout';
import { cn } from '@/libs/utils';

export default function Login() {
  const { mutate: loginEmployee, isLoading } = useLoginEmployee();
  const queryClient = useQueryClient();

  const loginCashierSchema = z.object({
    email: z.string().min(1, { message: 'Email is required!' }).email('Please input valid email!'),
    password: z.string().min(1, { message: 'Password is required!' }).min(8, { message: 'Password must be at least 8 characters!' }),
  });
  type LoginCashierValidationSchema = z.infer<typeof loginCashierSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginCashierValidationSchema>({
    resolver: zodResolver(loginCashierSchema),
  });

  const onSubmit: SubmitHandler<LoginCashierValidationSchema> = async (data) => {
    loginEmployee(
      { ...data, remember: true },
      {
        onSuccess: () => {
          queryClient.clear();
          toast.success('Welcome back admin!');
        },
        onError: () => {
          toast.error('Invalid credentials!');
          setError('email', { message: 'Email or password is incorrect!' });
        },
      }
    );
  };

  return (
    <CashierLayout loginForm={true}>
      <TitlePage>Login Admin</TitlePage>
      <div className="w-full min-h-full flex items-center justify-center">
        <div className="py-10 flex flex-col justify-center items-center">
          <form className="bg-#ECF4F3 rounded-xl mt-7 w-[457px] flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex justify-center items-center bg-#02221D py-7 rounded-b-[50px] border border-#02221D rounded-t-xl">
              <Image src="/images/logo-barberque.png" alt="Logo barberque" width={195} height={225} />
            </div>
            <div className="w-full flex flex-col justify-center items-center px-9 pt-3 pb-9">
              <span className="text-center font-bold w-full text-2xl mb-4">Login Admin</span>
              <div className="relative w-full">
                <MessageIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.email && 'text-red-500')} />
                <Input
                  placeholder="Email"
                  type="email"
                  className={cn(
                    'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] border-#05312A border-opacity-25 border placeholder:text-[#2f2f2f] mb-4',
                    errors.email && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                  )}
                  disabled={isLoading}
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 font-semibold text-xs">{errors.email.message}</p>}
              </div>
              <div className="relative w-full">
                <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.password && 'text-red-500')} />
                <Input
                  placeholder="Password"
                  type="password"
                  className={cn(
                    'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] border-#05312A border-opacity-25 border placeholder:text-[#2f2f2f] mb-4',
                    errors.password && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
                  )}
                  disabled={isLoading}
                  {...register('password')}
                />
                {errors.password && <p className="text-red-500 font-semibold text-xs">{errors.password.message}</p>}
              </div>
              <Button className="uppercase mt-3 rounded-md bg-#05312A hover:bg-#02221D w-full">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </CashierLayout>
  );
}
