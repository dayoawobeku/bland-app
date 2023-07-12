'use client';

import Image from 'next/image';
import Link from 'next/link';
import {closeIc, maxResponses} from '@/assets/images';
import {Modal} from '@/components';

const MaxResponsesDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="bg-black py-14 px-6 sm:px-[100px] xl:pt-36 max-w-[582px] rounded-[3px] relative"
    >
      <button
        className="absolute top-6 right-6 w-[42px] h-[42px]"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Image src={closeIc} alt="close dialog" width={42} height={42} />
      </button>
      <div className="flex flex-col items-center justify-center text-center">
        <Image src={maxResponses} alt="" width={128} height={186} priority />
        <div className="my-8">
          <h3 className="font-unbounded font-bold text-md-small">Ooops!</h3>
          <p className="font-manrope font-light text-semi-sm px-[30px] mt-3">
            Looks like you&apos;ve reached the maximum number of responses for
            this session. No worries, to continue your experience, simply log in
            again in 24 hours for a fresh session or try our AI-Human service.
          </p>
        </div>

        <Link
          href="/preferred-naming-method/ai-human-service"
          className="w-[91.365%] bg-primary text-grey-800 rounded-lg font-manrope transition-all duration-300 py-[15.5px] hover:bg-primary-600 active:bg-primary-700"
        >
          Use AI-Human Service
        </Link>
      </div>
    </Modal>
  );
};

export default MaxResponsesDialog;
