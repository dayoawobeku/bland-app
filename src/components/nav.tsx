'use client';

import Image from 'next/image';
import Link from 'next/link';
import {logo} from '@/assets/images';
import Button from './button';
import Loader from './loader';
import {useAuth} from '@/hooks';
import {LoadingState} from '@/types';

export default function Nav() {
  const {handleSignUp, status} = useAuth();

  if (status === LoadingState.Loading) {
    return <Loader text="Loading..." />;
  } else if (status === LoadingState.Error) {
    return (
      <div className="error-message">
        <p>An error occurred</p>
      </div>
    );
  }

  return (
    <header className="mx-auto max-w-[1312px] px-4">
      <nav className="flex items-center justify-between rounded-[15px] border border-grey-900 bg-grey px-3 sm:px-[29px] py-[22px] shadow-[0_18px_48px_0_rgba(0,0,0,0.15)]">
        <Link href="/">
          <Image src={logo} alt="logo" width={128.92} height={28.66} priority />
        </Link>
        <Button onClick={handleSignUp} />
      </nav>
    </header>
  );
}
