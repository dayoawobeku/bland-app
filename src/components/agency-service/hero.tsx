'use client';

import Image from 'next/image';
import {appScreenshot, appScreenshotSm} from '@/assets/images';
import {Button, Loader, Nav} from '@/components';
import {useAuth} from '@/hooks';
import {LoadingState} from '@/types';

export default function Hero() {
  const {handleSignUp, handleLogin, status} = useAuth();

  if (status === LoadingState.Loading) {
    return <Loader text="Loading..." />;
  } else if (status === LoadingState.Error) {
    return (
      <div>
        <p>An error occurred</p>
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(0deg,rgba(0,0,0,1)31.45%,rgba(20,20,20,1)100%)] overflow-x-hidden">
      <div className="pt-7 sm:pt-10">
        <Nav />
      </div>

      <main className="mx-auto mt-14 md:mt-24 max-w-[calc(1281px+32px)] px-4 text-center">
        <h1 className="mx-auto max-w-[1089px] font-unbounded text-md2 sm:text-lg md:text-xl font-bold">
          turn your tech product into unforgettable stories
        </h1>
        <p className="mx-auto mt-5 max-w-[525px] font-manrope text-base font-light sm:text-md-small tracking-[-1.9%]">
          We’re a full-service product marketing agency getting tech products to
          market and keeping them there.
        </p>
        <div className="mt-7">
          <Button text="Work with us" />
        </div>
      </main>

      <section className="hidden min-[391px]:flex relative z-10 mx-auto mt-16 max-w-full justify-center px-4">
        <Image
          src={appScreenshot}
          alt="app screenshot"
          width={1014}
          height={697}
          priority
          quality={100}
          placeholder="blur"
        />
      </section>
      <section className="flex min-[391px]:hidden w-[577.56px] h-[397px] relative z-10 mx-auto mt-12 max-w-full justify-center -mr-5">
        <Image
          src={appScreenshotSm}
          alt="app screenshot"
          priority
          quality={100}
          placeholder="blur"
          fill
          sizes="(min-width: 640px) 577.56px, 100vw"
        />
      </section>
    </div>
  );
}
