'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {closeIc, submission} from '@/assets/images';
import {Button, Modal} from '@/components';

const SubmissionDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="bg-black py-14 px-6 sm:px-16 max-w-[582px] rounded-[3px] relative"
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
            Your details have been submitted 🎉
          </h3>
          <p className="font-manrope font-light text-semi-sm px-6 mt-3">
            We have received your brand details and would be setting up a
            personality for your brand. Please choose your preferred service.
          </p>
        </div>

        <Button
          className="w-full"
          text="Choose plan"
          size="custom"
          padding="sm:px-[132px]"
          onClick={() => {
            router.push('/pricing-plans');
          }}
        />
      </div>
    </Modal>
  );
};

export default SubmissionDialog;
