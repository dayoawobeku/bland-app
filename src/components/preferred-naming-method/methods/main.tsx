'use client';

import {useContext, useState} from 'react';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import Select, {OnChangeValue, ActionMeta} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {motion, AnimatePresence, useReducedMotion} from 'framer-motion';
import {AI_HUMAN_NAME_DATA, FREE_AI_NAME_DATA} from '@/helpers/data';
import {next, previous} from '@/assets/images';
import {
  Button,
  DropdownIndicator,
  Input,
  customStyles,
  MultiValueRemove,
  Loader,
} from '@/components';
import {Keyword, OptionType} from '@/types';
import {usePostData} from '@/hooks/data-fetching';
import {SubmissionDialog} from '../ai-human-service';
import {DataContext, SelectedOptionsContext} from '@/context';

const Main = ({
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}) => {
  const {selectedOptions, setSelectedOptions} = useContext(
    SelectedOptionsContext,
  );
  const prefersReducedMotion = useReducedMotion();
  const {setPostData} = useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [whatYouProvide, setWhatYouProvide] = useState('');
  const [whatYouProvideFor, setWhatYouProvideFor] = useState('');
  const [keywords, setKeywords] = useState<(string | Keyword)[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessVision, setBusinessVision] = useState('');
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isHumanName = pathname === '/preferred-naming-method/ai-human-service';

  const nameData = isHumanName ? AI_HUMAN_NAME_DATA : FREE_AI_NAME_DATA;
  const DATA = nameData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === nameData.length - 1;

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    setSelectedOption(selectedOptions[nextQuestionIndex] || null);
    setDirection(1);
    setCurrentQuestionIndex(nextQuestionIndex);
  };

  const handlePrevQuestion = () => {
    const prevQuestionIndex = currentQuestionIndex - 1;
    setSelectedOption(selectedOptions[prevQuestionIndex] || null);
    setDirection(-1);
    setCurrentQuestionIndex(prevQuestionIndex);
  };

  const handleChange = (option: OnChangeValue<OptionType, false>) => {
    setSelectedOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      const updatedOption = {...option};

      updatedOptions[currentQuestionIndex] = updatedOption as OptionType;
      return updatedOptions;
    });

    setSelectedOption(option as OptionType);
  };

  const handleKeyDown: React.KeyboardEventHandler = event => {
    if (!currentKeyword) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const updatedKeywords = [...keywords, currentKeyword];
        setKeywords(updatedKeywords);

        const updatedOption = {
          ...selectedOption,
          keywords: updatedKeywords,
        } as OptionType;

        setSelectedOptions(prevOptions => {
          const updatedOptions = [...prevOptions];
          updatedOptions[currentQuestionIndex] = updatedOption;
          return updatedOptions;
        });

        setCurrentKeyword('');
        event.preventDefault();
    }
  };

  const {mutateAsync, status} = usePostData();

  const handleAiSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();

    const companyType = selectedOptions[0]?.label;
    const industry = selectedOptions[1]?.label;
    const seedWords = keywords.join(', ');

    const requestBody = {
      companyType,
      industry,
      whatYouProvide,
      whatYouProvideFor,
      seedWords,
    };
    setIsSubmitting(true);
    try {
      const data = await mutateAsync(requestBody);
      setPostData(data?.data);
      router.push(`${pathname}/results`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loader />;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  const handleHumanSubmit = (event: {preventDefault: () => void}) => {
    event.preventDefault();

    setIsSubmissionDialogOpen(true);
    router.push(`${pathname}?submitted=true`);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const transition = {
    x: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      duration: 1.3,
    },
    opacity: {duration: 0.4},
  };

  return (
    <>
      <SubmissionDialog
        isOpen={isSubmissionDialogOpen}
        setIsOpen={setIsSubmissionDialogOpen}
      />
      <form
        className="relative h-full"
        onSubmit={isHumanName ? handleHumanSubmit : handleAiSubmit}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            variants={variants}
            key={currentQuestionIndex}
            transition={prefersReducedMotion ? {} : transition}
            className="flex flex-col absolute inset-0 w-full h-[calc(100%-32px)]"
          >
            <h1 className="font-unbounded font-medium text-md md:text-lg w-full max-w-[707px]">
              {DATA.question}
            </h1>
            {isHumanName && DATA.instruction !== '' && (
              <p className="mt-4 text-semi-sm font-manrope font-light">
                {DATA.instruction}
              </p>
            )}

            {DATA.inputType === 'dropdown' && (
              <Select
                id={DATA.id.toString()}
                instanceId={DATA.id.toString()}
                value={selectedOption}
                onChange={
                  handleChange as (
                    newValue: unknown,
                    actionMeta: ActionMeta<unknown>,
                  ) => void
                }
                options={DATA.options}
                placeholder="Select your answer here"
                components={{DropdownIndicator}}
                classNamePrefix="react-select"
                className={isHumanName ? 'mt-11 md:mt-16' : 'mt-11 md:mt-20'}
                styles={customStyles}
                isSearchable={false}
                openMenuOnFocus
                required
              />
            )}

            {DATA.inputType === 'text' &&
              DATA.inputTextType !== 'user-name' && (
                <div className="flex items-center gap-5 max-[500px]:flex-wrap font-unbounded mt-11 md:mt-20">
                  <span className="text-semi-sm md:text-p2 font-medium whitespace-nowrap max-[500px]:w-[29%]">
                    We provide
                  </span>
                  <label
                    htmlFor="what_you_provide"
                    className="max-[500px]:w-[62%] w-[34.37%]"
                  >
                    <Input
                      id="what_you_provide"
                      data-not-rounded
                      placeholder="Type your answer here"
                      type="text"
                      value={whatYouProvide}
                      ariaLabel="What you provide"
                      onChange={e => {
                        setWhatYouProvide(e.target.value);
                        handleChange({
                          ...selectedOption,
                          whatYouProvide: e.target.value,
                        } as OnChangeValue<OptionType, false>);
                      }}
                      required
                    />
                  </label>
                  <span className="text-semi-sm md:text-p2 font-medium">
                    for
                  </span>
                  <label
                    htmlFor="what_you_provide_for"
                    className="max-[500px]:w-[62%] w-[34.37%]"
                  >
                    <Input
                      id="what_you_provide_for"
                      data-not-rounded
                      placeholder="Type your answer here"
                      type="text"
                      value={whatYouProvideFor}
                      ariaLabel="What you provide for"
                      onChange={e => {
                        setWhatYouProvideFor(e.target.value);
                        handleChange({
                          ...selectedOption,
                          whatYouProvideFor: e.target.value,
                        } as OnChangeValue<OptionType, false>);
                      }}
                      required
                    />
                  </label>
                </div>
              )}

            {DATA.inputType === 'keywords' && (
              <div className="mt-11 md:mt-20">
                <CreatableSelect
                  components={{
                    DropdownIndicator: null,
                    MultiValueRemove,
                  }}
                  inputValue={currentKeyword}
                  isClearable
                  isMulti
                  menuIsOpen={false}
                  onChange={(newValue: unknown) => {
                    if (Array.isArray(newValue)) {
                      setKeywords(
                        newValue.map((keyword: Keyword) => keyword.value),
                      );
                      handleChange({
                        ...selectedOption,
                        keywords: newValue.map(
                          (keyword: Keyword) => keyword.value,
                        ),
                      } as OptionType);
                    }
                  }}
                  onInputChange={newValue => setCurrentKeyword(newValue)}
                  onKeyDown={handleKeyDown}
                  value={keywords.map((keyword, index) => ({
                    label: keyword,
                    value: keyword,
                    key: `${keyword}-${index}`,
                  }))}
                  placeholder="Type your answer here"
                  classNamePrefix="react-select__multi"
                  styles={customStyles}
                  required
                />
                <p className="mt-2 text-semi-sm font-manrope font-light">
                  Press enter after adding each keyword
                </p>
              </div>
            )}

            {DATA.inputTextType === 'business-vision' && (
              <textarea
                name=""
                id="business_vision"
                placeholder="Type your answer here"
                className="mt-11 md:mt-16 md:max-w-[85.73%]"
                aria-label="Business vision"
                value={businessVision}
                onChange={e => {
                  setBusinessVision(e.target.value);
                  handleChange({
                    ...selectedOption,
                    businessVision: e.target.value,
                  } as OnChangeValue<OptionType, false>);
                }}
                required
              ></textarea>
            )}

            {DATA.inputTextType === 'user-name' && (
              <div className="flex flex-col gap-5 font-unbounded mt-8">
                <div className="flex items-center gap-6">
                  <span className="text-p2 font-medium">
                    Your first name is
                  </span>
                  <label htmlFor="first_name" className="w-[34.37%]">
                    <Input
                      id="first_name"
                      data-not-rounded
                      placeholder="Type your answer here"
                      type="text"
                      value={firstName}
                      ariaLabel="First name"
                      onChange={e => {
                        setFirstName(e.target.value);
                        handleChange({
                          ...selectedOption,
                          firstName: e.target.value,
                        } as OnChangeValue<OptionType, false>);
                      }}
                      required
                    />
                  </label>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-p2 font-medium">
                    While your last name is
                  </span>
                  <label htmlFor="last_name" className="w-[34.37%]">
                    <Input
                      id="last_name"
                      data-not-rounded
                      placeholder="Type your answer here"
                      type="text"
                      value={lastName}
                      ariaLabel="Last name"
                      onChange={e => {
                        setLastName(e.target.value);
                        handleChange({
                          ...selectedOption,
                          lastName: e.target.value,
                        } as OnChangeValue<OptionType, false>);
                      }}
                      required
                    />
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div
          className={`flex items-center justify-between w-full absolute right-0 bottom-0 ${
            isLastQuestion ? '-mb-[15px]' : ''
          }`}
        >
          {currentQuestionIndex !== 0 && (
            <button
              onClick={handlePrevQuestion}
              className="flex items-center gap-1"
              type="button"
            >
              <Image src={previous} alt="Previous" width={24} height={24} />
              <span className="text-p2 font-unbounded font-medium">Prev</span>
            </button>
          )}
          {isLastQuestion ? (
            <Button text="Submit" size="medium" />
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-1 ml-auto"
              type="button"
            >
              <span className="text-p2 font-unbounded font-medium">Next</span>
              <Image src={next} alt="Next" width={24} height={24} />
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Main;
