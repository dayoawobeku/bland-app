import Image from 'next/image';
import Link from 'next/link';
import {logo} from '@/assets/images';

export default function Nav() {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="logo" width={128.92} height={28.66} />
        </Link>
        <p>Sth here</p>
      </nav>
    </header>
  );
}
