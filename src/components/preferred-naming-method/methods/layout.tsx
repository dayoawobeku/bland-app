'use client';

import {useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {Aside, Main} from '.';
import {FREE_AI_NAME_DATA, AI_HUMAN_NAME_DATA} from '@/helpers/data';
import {useAuth} from '@/hooks';
import {logo, suitcase, userCheck, userCheckPrimary} from '@/assets/images';
import {NameData} from '@/types';
import Nav from '../nav';

function SideItems({DATA}: {DATA: NameData}) {
  return (
    <>
      <div className="mt-14 md:mt-[139px] flex items-center justify-between w-full">
        <div
          className={`relative flex flex-col gap-2 w-full after:content-[''] after:absolute after:h-[1px] after:w-full after:bg-grey-150 after:top-5 before:content-[''] before:absolute before:h-[1px] before:bg-primary before:transition-all before:duration-300 before:top-5 before:z-[5] before:w-[${
            DATA?.width ? DATA?.width : ''
          }]`}
        >
          <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-grey-400 z-10">
            <Image src={suitcase} alt="" width={20} height={20} />
          </div>
          <p className="font-manrope text-semi-sm">Craft your brand</p>
        </div>
        <div className="flex flex-col gap-2 whitespace-nowrap">
          <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-grey-200">
            <Image
              src={DATA?.width === '100%' ? userCheckPrimary : userCheck}
              alt=""
              width={20}
              height={20}
            />
          </div>
          <p className="font-manrope text-semi-sm">
            {DATA?.userCheckText ? DATA?.userCheckText : 'User Check'}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Layout() {
  const pathname = usePathname();
  const {handleLogout} = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isHumanName = pathname === '/preferred-naming-method/ai-human-service';
  const nameData = isHumanName ? AI_HUMAN_NAME_DATA : FREE_AI_NAME_DATA;
  const DATA = nameData[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-grey-800">
      <div className="flex flex-col md:flex-row min-h-screen basis-full items-stretch md:justify-between overflow-x-hidden px-4 md:px-0">
        <aside className="hidden md:flex basis-[37.15%] flex-col bg-black px-4 lg:pl-[5.56%] lg:pr-[3.06%] pt-[60px] pb-16">
          <Aside>
            <Link href="/" className="w-fit">
              <Image src={logo} alt="logo" width={128.92} height={28.66} />
            </Link>
            <SideItems DATA={DATA} />
          </Aside>
        </aside>
        <div className="md:hidden pt-10">
          <Nav />
          <SideItems DATA={DATA} />
        </div>
        <main className="flex flex-col basis-full md:basis-[62.85%] md:pl-[2.78%] md:pr-[5.56%] pt-10 md:pt-[60px] md:pb-[70px]">
          <button
            type="button"
            className="hidden md:flex text-white font-medium text-md-small justify-end"
            onClick={handleLogout}
          >
            Logout
          </button>
          <section className="md:pt-[21.39%] flex flex-col justify-between h-[360px] md:h-full">
            <Main
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          </section>
        </main>
        <div className="md:hidden mt-14 mb-16">
          <span className="text-really-sm md:text-base font-manrope font-light">
            Have a question?{' '}
          </span>
          <Link
            href="/"
            className="font-unbounded text-base md:text-md-small underline text-primary tracking-[-1.9%] hover:opacity-80 transition-all duration-300"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
