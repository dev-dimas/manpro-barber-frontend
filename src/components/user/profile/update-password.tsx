import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { LockIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginUser, useUpdateUserPassword } from '@/hooks/query';
import useUser from '@/hooks/store/useUser';
import { cn } from '@/libs/utils';

export default function UpdatePassword() {
  const user = useUser((state) => state.userData);
  const { mutate: updateUserPassword, isLoading } = useUpdateUserPassword();
  const { mutate: loginUser } = useLoginUser();

  const updatePasswordSchema = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: 'Current password is required!' })
        .min(8, { message: 'Current password must be at least 8 characters!' }),
      newPassword: z.string().min(1, { message: 'Password is required!' }).min(8, { message: 'Password must be at least 8 characters!' }),
      confirmPassword: z.string().min(1, { message: 'Confirm password is required!' }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Passwords and confirmation password doesnt match',
      path: ['confirmPassword'],
    });
  type UpdatePasswordValidationSchema = z.infer<typeof updatePasswordSchema>;

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<UpdatePasswordValidationSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordValidationSchema> = async (data) => {
    updateUserPassword(
      { ...data, userId: user?.id },
      {
        onSuccess: () => {
          loginUser(
            { email: user?.email, password: data.newPassword, remember: false },
            {
              onSuccess: () => {
                toast.success('Successfully update password');
                resetForm();
              },
              onError: () => {
                throw new Error();
              },
            }
          );
        },
        onError: (error: any) => {
          if (error.message === 'Current password not valid') {
            toast.error('Failed to update password. Incorrect current password!');
          } else {
            toast.error('Failed to update password. Try again later!');
          }
        },
      }
    );
  };

  return (
    <form className="w-full flex flex-col gap-[14px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.currentPassword && 'text-red-500')} />
        <Input
          placeholder="Current Password"
          type="password"
          className={cn(
            'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3]',
            errors.currentPassword && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
          )}
          disabled={isLoading}
          {...register('currentPassword')}
        />
        {errors.currentPassword && <p className="text-red-500 font-semibold text-xs">{errors.currentPassword.message}</p>}
      </div>
      <div className="relative">
        <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.newPassword && 'text-red-500')} />
        <Input
          placeholder="New Password"
          type="password"
          className={cn(
            'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3]',
            errors.newPassword && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
          )}
          disabled={isLoading}
          {...register('newPassword')}
        />
        {errors.newPassword && <p className="text-red-500 font-semibold text-xs">{errors.newPassword.message}</p>}
      </div>
      <div className="relative">
        <LockIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.newPassword && 'text-red-500')} />
        <Input
          placeholder="Confirm Password"
          type="password"
          className={cn(
            'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3]',
            errors.confirmPassword && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
          )}
          disabled={isLoading}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="text-red-500 font-semibold text-xs">{errors.confirmPassword.message}</p>}
      </div>
      <div className="w-full flex justify-end">
        <Button className="w-fit bg-#05312A hover:bg-#02221D uppercase text-xs font-semibold" type="submit">
          {isLoading ? (
            <>
              <Loader2Icon className="animate-spin mr-2" />
              Loading...
            </>
          ) : (
            <>Save Changes</>
          )}
        </Button>
      </div>
    </form>
  );
}
