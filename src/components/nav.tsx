import Image from 'next/image';
import Link from 'next/link';
import {logo} from '@/assets/images';
import Button from './button';

export default function Nav() {
  return (
    <header className="mx-auto max-w-[1312px] px-4">
      <nav className="flex items-center justify-between rounded-[15px] border border-grey-900 bg-grey px-[29px] py-[22px] shadow-[0_18px_48px_0_rgba(0,0,0,0.15)]">
        <Link href="/">
          <Image src={logo} alt="logo" width={128.92} height={28.66} />
        </Link>
        <Button />
      </nav>
    </header>
  );
}
