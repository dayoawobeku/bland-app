interface ButtonProps {
  size?: 'default' | 'large' | 'medium';
  text?: string;
}

export default function Button({
  size = 'default',
  text = 'Get started',
}: ButtonProps) {
  const buttonClasses =
    'rounded-lg bg-primary py-[15.5px] font-manrope text-grey-800 transition-all duration-300 hover:bg-primary-600 active:bg-primary-700';
  const buttonStyles =
    size === 'large'
      ? 'px-[132px]'
      : size === 'medium'
      ? 'px-[44.5px]'
      : 'px-[13.68px] sm:px-[28.5px]';
  return <button className={`${buttonStyles} ${buttonClasses}`}>{text}</button>;
}
