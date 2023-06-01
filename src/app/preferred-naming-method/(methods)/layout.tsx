import Image from 'next/image';
import Link from 'next/link';
import {logo, suitcase, userCheck} from '@/assets/images';

export default function NamingMethodsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-grey-800">
      <div className="flex min-h-screen basis-full items-stretch justify-between">
        <aside className="flex basis-[37.15%] flex-col bg-black pl-[5.56%] pr-[3.06%] pt-[60px] pb-16">
          <Link href="/" className="w-fit">
            <Image src={logo} alt="logo" width={128.92} height={28.66} />
          </Link>
          <div className="mt-[139px] flex items-center w-full pr-16">
            <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-grey-400">
              <Image src={suitcase} alt="" width={20} height={20} />
            </div>
            <div className="flex-1 h-[1px] bg-grey-150 relative">
              <div className="absolute left-0 bg-primary w-3/4 h-full"></div>
            </div>
            <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-grey-200">
              <Image src={userCheck} alt="" width={20} height={20} />
            </div>
          </div>
          <div className="flex mt-2 items-center justify-between pr-[11px] font-manrope text-semi-sm">
            <p>Craft your brand</p>
            <p>Choose name</p>
          </div>

          <div className="mt-32 flex flex-col gap-4 pr-9">
            <p className="font-unbounded text-grey-300 font-medium">
              Fun facts
            </p>
            <p className="font-manrope font-medium text-md-small">
              The word &quot;brand&quot; originally referred to a burning mark
              on livestock to indicate ownership.
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
        </aside>
        <main className="flex flex-col basis-[62.85%] pl-[2.78%] pr-[5.56%] pt-[60px] pb-[70px]">
          <p className="ml-auto">Logout</p>
          <section className="pt-[21.39%]">{children}</section>
        </main>
      </div>
    </div>
  );
}
