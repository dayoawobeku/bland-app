import Link from 'next/link';
import Image from 'next/image';
import {logo, suitcase, userCheck} from '@/assets/images';

export default function Aside({userCheckText}: {userCheckText: string}) {
  return (
    <>
      <Link href="/" className="w-fit">
        <Image src={logo} alt="logo" width={128.92} height={28.66} />
      </Link>
      <div className="mt-[139px] flex items-center justify-between w-full">
        <div className="relative w-full after:content-[''] after:absolute after:h-[1px] after:w-full after:bg-grey-150 after:top-5 flex flex-col gap-2 before:content-[''] before:absolute before:h-[1px] before:w-3/4 before:bg-primary before:top-5 before:z-[5]">
          <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-grey-400 z-10">
            <Image src={suitcase} alt="" width={20} height={20} />
          </div>
          <p className="font-manrope text-semi-sm">Craft your brand</p>
        </div>
        <div className="flex flex-col gap-2 whitespace-nowrap">
          <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-grey-200">
            <Image src={userCheck} alt="" width={20} height={20} />
          </div>
          <p className="font-manrope text-semi-sm">{userCheckText}</p>
        </div>
      </div>

      <div className="mt-32 flex flex-col gap-4 pr-9">
        <p className="font-unbounded text-grey-300 font-medium">Fun facts</p>
        <p className="font-manrope font-medium text-md-small">
          The word &quot;brand&quot; originally referred to a burning mark on
          livestock to indicate ownership.
        </p>
      </div>

      <div className="mt-auto">
        <span className="font-manrope font-light">Have a question? </span>
        <Link
          href="/"
          className="font-unbounded text-md-small underline text-primary tracking-[-1.9%]"
        >
          Contact us
        </Link>
      </div>
    </>
  );
}
