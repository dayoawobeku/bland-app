interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'large' | 'medium';
  text?: string;
}

export default function Button({
  size = 'default',
  text = 'Get started',
  ...otherProps
}: ButtonProps) {
  const padding = 'py-[15.5px]';
  const buttonStyles =
    size === 'large'
      ? 'px-[132px]'
      : size === 'medium'
      ? 'px-[44.5px]'
      : 'px-[13.68px] sm:px-[28.5px]';
  return (
    <button {...otherProps} className={`${buttonStyles} ${padding}`}>
      {text}
    </button>
  );
}
