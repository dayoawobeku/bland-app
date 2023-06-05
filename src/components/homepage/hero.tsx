'use client';

import Image from 'next/image';
import {appScreenshot} from '@/assets/images';
import {Button, Nav} from '@/components';
import {useAuth} from '@/hooks';

export default function Hero() {
  const {handleSignUp, handleLogin} = useAuth();
  return (
    <div className="bg-[linear-gradient(0deg,rgba(0,0,0,1)31.45%,rgba(20,20,20,1)100%)]">
      <div className="pt-10">
        <Nav />
      </div>

      <main className="mx-auto mt-36 max-w-[calc(1281px+32px)] px-4 text-center">
        <h1 className="mx-auto max-w-[1020px] font-unbounded text-xl font-bold">
          The fastest naming experience for brands
        </h1>
        <p className="mx-auto mt-5 max-w-[708px] font-manrope text-md-small tracking-[-1.9%]">
          <span className="font-light">
            Get unique brand name and available domain in no time.
            Human-AI-crafted names powered by GPT-4 —
          </span>
          <span className="font-medium text-primary">
            {' '}
            not a name generating tool.
          </span>
        </p>
        <div className="mt-7 flex items-center justify-center gap-5">
          <Button text="Sign up with Google" onClick={handleSignUp} />
          <Button text="Log in with Google" onClick={handleLogin} />
        </div>
      </main>

      <section className="relative z-10 mx-auto mt-16 flex max-w-full justify-center px-4">
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
    </div>
  );
}
