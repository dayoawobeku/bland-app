import Image from 'next/image';
import {nameIc} from '@/assets/images';
import {CardProps} from './types';

export default function Card({
  heading,
  paragraph,
  id,
  active,
  handleCardClick,
}: CardProps) {
  const handleClick = () => {
    handleCardClick?.(id, active);
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={`flex flex-col items-start rounded px-[27px] pb-[13px] pt-[33px] outline transition-all duration-300 focus:outline-primary-700 ${
        active
          ? 'bg-black outline-2 outline-primary'
          : 'outline-1 outline-grey-300 hover:outline-primary-700'
      }`}
      aria-label={heading}
      onClick={handleClick}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          handleClick();
        }
      }}
    >
      <Image src={nameIc} alt="" width={60} height={61} />
      <p className="mt-5 font-unbounded text-p2 font-medium">{heading}</p>
      <p className="mt-[14px] font-manrope text-semi-sm font-light">
        {paragraph}
      </p>
      {id === 1 ? (
        <p className="mt-[14px] font-manrope text-semi-sm text-grey-300">
          *7 free trials for AI-Powered Names
        </p>
      ) : null}
    </div>
  );
}
