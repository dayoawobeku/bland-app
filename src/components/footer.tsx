import Image from 'next/image';
import {logo, facebookIc, twitterIc, linkedinIc} from '@/assets/images';

export default function Footer() {
  return (
    <footer className="bg-grey-100 px-4 py-8">
      <div className="mx-auto flex max-w-[calc(1281px+32px)] items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-5">
          <Image
            src={logo}
            alt="bland logo"
            width={88}
            height={24}
            style={{width: 88, height: 24}}
          />
          <p className="font-manrope text-really-sm">
            © Copyright Bland {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-5 sm:gap-17">
          <div className="flex items-center gap-3">
            <a href="#">
              <Image
                src={facebookIc}
                alt="facebook url"
                width={21}
                height={21}
                style={{width: 21, height: 21}}
              />
            </a>
            <a href="#">
              <Image
                src={twitterIc}
                alt="twitter url"
                width={21}
                height={21}
                style={{width: 21, height: 21}}
              />
            </a>
            <a href="#">
              <Image
                src={linkedinIc}
                alt="linkedin url"
                width={21}
                height={21}
                style={{width: 21, height: 21}}
              />
            </a>
          </div>
          <div className="flex gap-10 font-manrope font-light">
            <a
              href="#"
              className="transition-all duration-300 hover:text-primary"
            >
              Terms of use
            </a>
            <a
              href="#"
              className="transition-all duration-300 hover:text-primary"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
