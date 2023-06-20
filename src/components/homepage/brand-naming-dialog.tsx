'use client';

import {useState} from 'react';
import Image from 'next/image';
import {
  badBrandName,
  bookMockup,
  brandNameChecklists,
  brandNameImportance,
  closeTransparentIc,
  next,
  previous,
} from '@/assets/images';
import {Button, Modal} from '@/components';

interface ButtonContainerProps {
  onPreviousClick: () => void;
  onNextClick: () => void;
  showPrevious: boolean;
  showNext: boolean;
}

function Wrapper({
  children,
  padding = 'p-12',
}: {
  children: React.ReactNode;
  padding?: string;
}) {
  return (
    <div
      className={`basis-[55.64%] flex flex-col justify-center h-full relative ${padding}`}
    >
      {children}
    </div>
  );
}

function ButtonContainer({
  onPreviousClick,
  onNextClick,
  showPrevious,
  showNext,
}: ButtonContainerProps) {
  return (
    <div className="flex absolute bottom-6 justify-between left-12 right-12">
      {showPrevious ? (
        <button
          className="flex items-center gap-1 group"
          type="button"
          onClick={onPreviousClick}
        >
          <Image src={previous} alt="Previous" width={24} height={24} />
          <span className="text-p2 font-unbounded font-medium group-hover:text-[#DDDDDD] transition-all duration-300">
            Prev
          </span>
        </button>
      ) : null}
      {showNext ? (
        <button
          className="flex items-center gap-1 group ml-auto"
          type="button"
          onClick={onNextClick}
        >
          <span className="text-p2 font-unbounded font-medium group-hover:text-[#DDDDDD] transition-all duration-300">
            Next
          </span>
          <Image src={next} alt="Next" width={24} height={24} />
        </button>
      ) : null}
    </div>
  );
}

function BrandNameImportance() {
  return (
    <>
      <div>
        <h3 className="font-unbounded font-semibold text-md">
          Why is brand name important?
        </h3>
        <p className="font-manrope font-light mt-4">
          Your brand name is often the first impression that a customer has of
          your business or product. A well-chosen brand name will contribute to
          how your business stands out in a crowded market, convey its values
          and personality, and create an emotional connection with customers.
        </p>
      </div>
    </>
  );
}

function BrandNameChecklists() {
  return (
    <>
      <div>
        <h3 className="font-unbounded font-medium text-p2">
          Essential checklists of a brand name
        </h3>
        <div className="mt-5 grid grid-rows-3 gap-8 pr-16 font-manrope">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-primary">Protectable</p>
              <p className="text-semi-sm font-light">
                Get a business name that’s available and not similar to a name
                that’s already registered with the government.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary">Domain Availability</p>
              <p className="text-semi-sm font-light">
                A name with an available domain preferably, secure the “.com”
                domain name as customers tend to associate “.com” with an
                established business.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-primary">Memorable</p>
              <p className="text-semi-sm font-light">
                A good brand name should be easy to remember and recall.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary">Simple</p>
              <p className="text-semi-sm font-light">
                A good brand name should be easy to spell, pronounce, and
                understand.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-primary">Relevant</p>
              <p className="text-semi-sm font-light">
                Your brand name should be relevant to the product or service it
                represents and convey its key benefits or values.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary">Timeless</p>
              <p className="text-semi-sm font-light">
                A good brand name should have longevity and not be tied to a
                particular era or trend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BadBrandName() {
  return (
    <>
      <div>
        <h3 className="font-unbounded font-semibold text-md">
          4 reasons you might end up with a bad brand name
        </h3>
        <div className="mt-7 grid grid-rows-2 gap-11 pr-16 font-manrope">
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-primary">Lack of research</p>
              <p className="text-semi-sm font-light">
                Creating a strong brand name requires extensive research and
                analysis of the target audience, competition, and industry
                trends.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary">Uninspired creativity</p>
              <p className="text-semi-sm font-light">
                Sometimes, brand names are chosen based on a lack of creativity
                or inspiration, resulting in generic or forgettable names that
                fail to resonate with consumers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-primary">Cultural insensitivity</p>
              <p className="text-semi-sm font-light">
                A brand name that is culturally insensitive or offensive can
                lead to negative publicity and backlash, damaging the
                brand&apos;s reputation.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-primary">Overcomplication</p>
              <p className="text-semi-sm font-light">
                Brand names that are overly complicated or difficult to
                pronounce can make it challenging for consumers to remember or
                identify the brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BookMockup() {
  return (
    <>
      <div>
        <h3 className="font-unbounded font-semibold text-md">
          How famous brands got their names.
        </h3>
        <p className="font-manrope font-light mt-4 max-w-[423px]">
          This is a Content offer to download an e-book: “Brand Name
          Etymology—How famous brands got their names.”
        </p>
        <Button
          type="button"
          text="Download now"
          size="custom"
          padding="px-[76px]"
          className="mt-8"
        />
      </div>
    </>
  );
}

const BrandNamingDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [currentComponent, setCurrentComponent] = useState(0);

  const handleNext = () => {
    setCurrentComponent(prevComponent =>
      prevComponent === components.length - 1 ? 0 : prevComponent + 1,
    );
  };

  const handlePrevious = () => {
    setCurrentComponent(prevComponent =>
      prevComponent === 0 ? components.length - 1 : prevComponent - 1,
    );
  };

  const components = [
    {
      key: 'brandNameImportance',
      component: <BrandNameImportance />,
    },
    {
      key: 'brandNameChecklists',
      component: <BrandNameChecklists />,
    },
    {key: 'badBrandName', component: <BadBrandName />},
    {key: 'bookMockup', component: <BookMockup />},
  ];
  const images = [
    brandNameImportance,
    brandNameChecklists,
    badBrandName,
    bookMockup,
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="bg-black max-w-[92.36%] relative rounded-xl max-h-[79.19%] h-full"
      transitionParentClassName="px-0"
    >
      <button
        className="absolute top-4 right-4 w-[34px] h-[34px] z-10"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <Image
          src={closeTransparentIc}
          alt="close dialog"
          width={34}
          height={34}
        />
      </button>
      <div className="flex items-center basis-full h-full">
        <div className="basis-[44.36%] h-full">
          <Image
            src={images[currentComponent]}
            alt="brand name importance"
            width={590}
            height={726}
            priority
            className="object-cover w-full h-full rounded-l-xl"
          />
        </div>
        <Wrapper
          padding={
            currentComponent === 1
              ? 'pt-6 pl-12 pr-20'
              : currentComponent === 2
              ? 'pt-6 pl-12 pr-24'
              : 'p-12'
          }
        >
          {components[currentComponent].component}
          <ButtonContainer
            onNextClick={handleNext}
            onPreviousClick={handlePrevious}
            showNext={currentComponent !== components.length - 1}
            showPrevious={currentComponent !== 0}
          />
        </Wrapper>
      </div>
    </Modal>
  );
};

export default BrandNamingDialog;
