import { useState } from 'react';
import TitlePage from '@/components/TitlePage';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UpdatePassword from '@/components/user/profile/update-password';
import UpdateProfile from '@/components/user/profile/update-profile';
import LoggedUserLayout from '@/layout/logged-user-layout';
import { cn } from '@/libs/utils';

export default function Profile() {
  const [isUpdatePasswordTabOpen, setIsUpdatePasswordTabOpen] = useState(false);

  return (
    <LoggedUserLayout>
      <TitlePage>Profile - Barberque</TitlePage>
      <div className="bg-#ECF4F3 rounded-2xl py-5">
        <div className="relative">
          <div className="px-4 flex text-#02221D gap-10">
            <Button
              variant={'ghost'}
              className={cn(
                'bg-#ECF4F3 hover:bg-#ECF4F3 text-base border-b-2 hover:border-b-#02221D rounded-none p-0 z-10 pb-3',
                !isUpdatePasswordTabOpen && 'border-b-#02221D font-semibold'
              )}
              onClick={() => setIsUpdatePasswordTabOpen(false)}
            >
              Update Profile
            </Button>
            <Button
              variant={'ghost'}
              className={cn(
                'bg-#ECF4F3 hover:bg-#ECF4F3 text-base border-b-2 hover:border-b-#02221D rounded-none p-0 z-10 pb-3',
                isUpdatePasswordTabOpen && 'border-b-#02221D font-semibold'
              )}
              onClick={() => setIsUpdatePasswordTabOpen(true)}
            >
              Update Password
            </Button>
          </div>
          <Separator className="bg-[#d9d9d9] absolute bottom-0" />
        </div>
        <div className="mt-7 px-8 text-#02221D">{isUpdatePasswordTabOpen ? <UpdatePassword /> : <UpdateProfile />}</div>
      </div>
    </LoggedUserLayout>
  );
}
