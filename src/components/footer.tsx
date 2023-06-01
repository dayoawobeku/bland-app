import Image from 'next/image';
import {logo, facebookIc, twitterIc, linkedinIc} from '@/assets/images';

export default function Footer() {
  return (
    <footer className="bg-grey-100 px-4 py-8">
      <div className="mx-auto flex max-w-[calc(1281px+32px)] items-center justify-between">
        <div className="flex items-center gap-5">
          <Image src={logo} alt="bland logo" width={88} height={24} />
          <p className="font-manrope text-really-sm">
            © Copyright Bland {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-17">
          <div className="flex items-center gap-3">
            <a href="#" className="h-[21px] w-[21px]">
              <Image
                src={facebookIc}
                alt="facebook url"
                width={21}
                height={21}
              />
            </a>
            <a href="#" className="h-[21px] w-[21px]">
              <Image src={twitterIc} alt="twitter url" width={21} height={21} />
            </a>
            <a href="#" className="h-[21px] w-[21px]">
              <Image
                src={linkedinIc}
                alt="linkedin url"
                width={21}
                height={21}
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
