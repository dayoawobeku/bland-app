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
      <div className="error-message">
        <p>An error occurred</p>
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(0deg,rgba(0,0,0,1)31.45%,rgba(20,20,20,1)100%)] overflow-x-hidden">
      <div className="pt-7 sm:pt-10">
        <Nav />
      </div>

      <main className="mx-auto mt-14 md:mt-36 max-w-[calc(1281px+32px)] px-4 text-center">
        <h1 className="mx-auto max-w-[1020px] font-unbounded text-md2 sm:text-lg md:text-xl font-bold">
          The fastest naming experience for brands
        </h1>
        <p className="mx-auto mt-5 max-w-[708px] font-manrope text-base sm:text-md-small tracking-[-1.9%]">
          <span className="font-light">
            Get unique brand name and available domain in no time.
            Human-AI-crafted names powered by GPT-4 —
          </span>
          <span className="font-medium text-primary">
            {' '}
            not a name generating tool.
          </span>
        </p>
        <div className="mt-7">
          <p className="uppercase font-unbounded font-light text-really-sm tracking-[3px]">
            Try bland for free
          </p>
          <div className="mt-3 flex items-center justify-center gap-5 flex-wrap">
            <Button text="Sign up with Google" onClick={handleSignUp} />
            <Button
              text="Log in with Google"
              onClick={handleLogin}
              bg="black"
              color="text-primary"
              className="outline outline-1 outline-primary"
            />
          </div>
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
        />
      </section>
    </div>
  );
}
