'use client';

import Link from 'next/link';

export default function Aside({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
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
          className="font-unbounded text-md-small underline text-primary tracking-[-1.9%] hover:opacity-80 transition-all duration-300"
        >
          Contact us
        </Link>
      </div>
    </>
  );
}
