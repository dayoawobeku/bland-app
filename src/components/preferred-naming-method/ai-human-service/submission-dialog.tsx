'use client';

import {closeIc, submission} from '@/assets/images';
import {Button, Modal} from '@/components';
import Image from 'next/image';

const SubmissionDialog = ({
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
      className="bg-black py-14 px-16 max-w-[582px] rounded-[3px] relative"
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
        <Image
          src={submission}
          alt="submission artwork"
          width={295}
          height={295}
          priority
        />
        <div className="my-8">
          <h3 className="font-manrope font-bold text-[1.375rem]">
            Your brand details have been submitted 🎉
          </h3>
          <p className="font-manrope font-light text-semi-sm px-6 mt-3">
            We have received your brand details and already setting up a
            personality for your brand. Please tell us what services you need.
          </p>
        </div>

        <Button
          className="mt-8"
          text="Choose plan"
          size="custom"
          padding="px-[132px]"
        />
      </div>
    </Modal>
  );
};

export default SubmissionDialog;