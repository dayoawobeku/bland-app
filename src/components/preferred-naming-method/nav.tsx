'use client';

import Image from 'next/image';
import Link from 'next/link';
import {logo} from '@/assets/images';
import {useAuth} from '@/hooks';

export default function Nav() {
  const {handleLogout} = useAuth();

  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="logo" width={128.92} height={28.66} />
        </Link>
        <button
          type="button"
          className="text-white font-medium text-md-small"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
