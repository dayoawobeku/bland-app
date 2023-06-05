'use client';

import {useState} from 'react';
import Image from 'next/image';
import Select, {OnChangeValue, ActionMeta} from 'react-select';
import {FREE_AI_NAME_DATA} from '@/helpers/data';
import {next, previous} from '@/assets/images';
import {Button, DropdownIndicator, customStyles} from '@/components';
import {OptionType} from '@/components/types';

const options: OptionType[] = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
];

export default function Main() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const question = FREE_AI_NAME_DATA[currentQuestionIndex].question;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleChange = (option: OnChangeValue<OptionType, false>) => {
    if (!option) return;
    setSelectedOption(option as OptionType);
  };
  const isLastQuestion = currentQuestionIndex === FREE_AI_NAME_DATA.length - 1;

  return (
    <>
      <div className="flex flex-col gap-20">
        <h1 className="font-unbounded font-medium text-lg">{question}</h1>

        <Select
          id="cross_border_company_stage"
          instanceId="cross_border_company_stage"
          value={selectedOption}
          onChange={
            handleChange as (
              newValue: unknown,
              actionMeta: ActionMeta<unknown>,
            ) => void
          }
          options={options}
          placeholder="Select your answer here"
          components={{DropdownIndicator}}
          classNamePrefix="react-select"
          styles={customStyles}
          isSearchable={false}
          // menuIsOpen
        />
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
