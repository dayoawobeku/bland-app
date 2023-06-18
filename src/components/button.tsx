interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'large' | 'medium' | 'zero' | number;
  text?: string;
  bg?: string;
  color?: string;
}

export default function Button({
  size = 'default',
  text = 'Get started',
  bg = 'primary',
  color = 'grey-800',
  className = '',
  ...otherProps
}: ButtonProps) {
  const getButtonStyles = (size: ButtonProps['size']) => {
    if (typeof size === 'number') {
      return `px-[${size}px]`;
    }
    switch (size) {
      case 'large':
        return 'px-[132px]';
      case 'medium':
        return 'px-[44.5px]';
      case 'zero':
        return 'px-0';
      default:
        return 'px-[13.68px] sm:px-[28.5px]';
    }
  };

  const buttonStyles = getButtonStyles(size);
  const bgClass = `bg-${bg}`;
  const hoverBgClass = `hover:bg-${bg}-600`;
  const activeBgClass = `active:bg-${bg}-700`;
  const fontColorClass = `text-${color}`;

  const classes =
    'rounded-lg font-manrope transition-all duration-300 hover:enabled:hover:bg-primary-600 active:enabled:active:bg-primary-700 py-[15.5px]';

  return (
    <button
      {...otherProps}
      className={`${buttonStyles} ${bgClass} ${hoverBgClass} ${activeBgClass} ${fontColorClass} ${classes} ${className}`}
    >
      {text}
    </button>
  );
}
