import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { AvatarCircleFillIcon, AvatarSquareIcon, CalendarIcon, GenderIcon, LocationIcon, MessageIcon, TelephoneIcon } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateUserProfile } from '@/hooks/query';
import useUser from '@/hooks/store/useUser';
import { cn } from '@/libs/utils';

export default function UpdateProfile() {
  const [date, setDate] = useState<Date>();
  const [avatarFile, setAvatarFile] = useState<File>();
  const user = useUser((state) => state.userData);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: updateUserProfile, isLoading } = useUpdateUserProfile(user?.id as string);
  const queryClient = useQueryClient();

  const updateProfileSchema = z.object({
    name: z.string().min(1, { message: 'Name is required!' }).min(3, { message: 'Please input valid name!' }),
    email: z.string().min(1, { message: 'Email is required!' }).email({ message: 'Please input valid email!' }),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .regex(new RegExp(/^(?:\+62|0)[0-9\-]+$/g), { message: 'Please input valid phone number!' })
      .min(10, { message: 'Please input valid phone number!' })
      .max(14, { message: 'Please input valid phone number!' }),
    gender: z
      .string()
      .optional()
      .transform((arg) => (arg ? arg : null)),
    address: z
      .string()
      .optional()
      .transform((arg) => (arg ? arg : null)),
  });
  type UpdateProfileValidationSchema = z.infer<typeof updateProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<UpdateProfileValidationSchema>({
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit: SubmitHandler<UpdateProfileValidationSchema> = async (data) => {
    const formData = new FormData();
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    data.gender && formData.append('gender', data.gender);
    formData.append('address', data.address ? data.address : '');
    date && formData.append('birthdayDate', dayjs(date).format('YYYY-MM-DD'));
    try {
      await updateUserProfile(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries('get-user');
          toast.success('Successfully update profile!');
        },
      });
    } catch (error) {
      toast.error('Something went wrong. Try again later!');
    }
  };

  const handleOpenFileBrowser = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && e.target.files?.[0].size > 1000000) {
      toast.error('Image size should be less than or equal 1MB!');
    } else {
      setAvatarFile(e.target.files?.[0]);
    }
  };

  useEffect(() => {
    user?.name && setValue('name', user.name);
    user?.email && setValue('email', user.email);
    user?.phone && setValue('phone', user.phone);
    user?.gender && setValue('gender', user.gender);
    user?.birthdayDate && setDate(new Date(user.birthdayDate));
    user?.address && setValue('address', user.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDate, setValue, user]);

  return (
    <div className="w-full flex gap-7">
      <div className="w-1/4 flex flex-col items-center gap-3">
        <Avatar className="h-[120px] w-[120px]">
          {(avatarFile || user?.avatar) && (
            <Image src={avatarFile ? URL.createObjectURL(avatarFile) : (user?.avatar as string)} alt="User Avatar" height={1000} width={1000} />
          )}
          {!avatarFile && !user?.avatar && (
            <AvatarFallback>
              <AvatarCircleFillIcon className="w-full h-full text-#FFF000" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col gap-[10px]">
          <Button className="uppercase border-#05312A px-6 py-3 " variant={'outline'} onClick={handleOpenFileBrowser}>
            Pilih Foto
          </Button>
          <span className="text-[9px] font-medium">Ukuran gambar : Maksimal 1 MB Format gambar : .JPG atau .PNG</span>
          <Input type="file" accept=".jpg,.png" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" />
        </div>
      </div>
      <form className="w-3/4 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <AvatarSquareIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.name && 'text-red-500')} />
          <Input
            placeholder="Input name"
            type="text"
            className={cn(
              'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3]',
              errors.name && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
            )}
            disabled={isLoading}
            {...register('name')}
          />
          {errors.name && <p className="text-red-500 font-semibold text-xs">{errors.name.message}</p>}
        </div>
        <div className="w-full flex gap-3">
          <div className="relative w-1/2">
            <GenderIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32')} />
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value as string} disabled={isLoading}>
                  <SelectTrigger className="h-[48px] bg-[#ececec] pl-10 text-sm">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent {...register('gender')}>
                    <SelectGroup>
                      <SelectItem value="l">Male</SelectItem>
                      <SelectItem value="p">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
          </div>
          <div className="relative w-1/2">
            <CalendarIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32 z-[1]')} />
            <DatePicker
              placeholderText="Input birthdate"
              selected={date}
              onChange={(date: Date) => setDate(date)}
              maxDate={new Date()}
              dateFormat={'dd/MM/yyyy'}
              showYearDropdown
              scrollableYearDropdown
              showMonthDropdown
              disabled={isLoading}
              required={user?.birthdayDate ? true : false}
              className="h-[48px] w-full rounded-md border bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3] text-sm"
            />
          </div>
        </div>
        <div className="relative">
          <MessageIcon className={cn('w-5 absolute h-[48px] left-[14px] text-#292D32', errors.email && 'text-red-500')} />
          <Input
            placeholder="Input email"
            type="email"
            className={cn(
              'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3]',
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
            placeholder="Input phone number"
            type="tel"
            className={cn(
              'h-[48px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3]',
              errors.phone && 'border-red-500 border-2 focus-visible:ring-offset-0 focus-visible:ring-0 mb-0 placeholder:text-red-500'
            )}
            disabled={isLoading}
            {...register('phone')}
          />
          {errors.phone && <p className="text-red-500 font-semibold text-xs">{errors.phone.message}</p>}
        </div>
        <div className="relative">
          <LocationIcon className={cn('w-5 absolute h-[40px] left-[14px] text-#292D32')} />
          <Textarea
            placeholder="Input Address"
            className={cn('h-[170px] bg-[#ececec] pl-10 text-[#2f2f2f] placeholder:text-[#b3b3b3]')}
            {...register('address')}
            disabled={isLoading}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button className="w-fit bg-#05312A hover:bg-#02221D uppercase text-xs font-semibold">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
