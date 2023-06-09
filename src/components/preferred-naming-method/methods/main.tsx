'use client';

import {useState} from 'react';
import Image from 'next/image';
import Select, {OnChangeValue, ActionMeta} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {FREE_AI_NAME_DATA} from '@/helpers/data';
import {next, previous} from '@/assets/images';
import {
  Button,
  DropdownIndicator,
  Input,
  customStyles,
  MultiValueRemove,
} from '@/components';
import {Keyword, OptionType} from '@/types';

export default function Main() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [whatYouProvide, setWhatYouProvide] = useState('');
  const [whatYouProvideFor, setWhatYouProvideFor] = useState('');
  const [keywords, setKeywords] = useState<(string | Keyword)[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState('');

  const DATA = FREE_AI_NAME_DATA[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === FREE_AI_NAME_DATA.length - 1;

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    setSelectedOption(selectedOptions[nextQuestionIndex] || null);
    setCurrentQuestionIndex(nextQuestionIndex);
  };

  const handlePrevQuestion = () => {
    const prevQuestionIndex = currentQuestionIndex - 1;
    setSelectedOption(selectedOptions[prevQuestionIndex] || null);
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

  return (
    <>
      <div className="flex flex-col gap-20">
        <h1 className="font-unbounded font-medium text-lg w-full max-w-[707px]">
          {DATA.question}
        </h1>
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
            styles={customStyles}
            isSearchable={false}
          />
        )}

        {DATA.inputType === 'text' && (
          <div className="flex items-center gap-5 font-unbounded">
            <span className="text-p2 font-medium">We provide</span>
            <label htmlFor="" className="w-[34.37%]">
              <Input
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
              />
            </label>
            <span className="text-p2 font-medium">for</span>
            <label htmlFor="" className="w-[34.37%]">
              <Input
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
              />
            </label>
          </div>
        )}

        {DATA.inputType === 'keywords' && (
          <div>
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
                    keywords: newValue.map((keyword: Keyword) => keyword.value),
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
            />
            <p className="mt-2 text-semi-sm font-manrope font-light">
              Press enter after adding each keywords
            </p>
          </div>
        )}
      </div>

      <div
        className={`flex items-center justify-between ${
          isLastQuestion ? '-mb-[15px]' : ''
        }`}
      >
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1 disabled:opacity-10 disabled:cursor-not-allowed"
        >
          <Image
            src={previous}
            alt={currentQuestionIndex === 0 ? 'Previous Disabled' : 'Previous'}
            width={24}
            height={24}
          />
          <span className="text-p2 font-unbounded font-medium">Prev</span>
        </button>
        {isLastQuestion ? (
          <Button text="Submit" size="medium" />
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-1"
          >
            <span className="text-p2 font-unbounded font-medium">Next</span>
            <Image src={next} alt="Next" width={24} height={24} />
          </button>
        )}
      </div>
    </>
  );
}
