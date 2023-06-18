interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'large' | 'medium' | 'zero' | number;
  text?: string;
  bg?: 'default' | 'white' | 'black';
  color?: string;
}

export default function Button({
  size = 'default',
  text = 'Get started',
  bg = 'default',
  color = 'text-grey-800',
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
  const getBackgroundColor = (bg: ButtonProps['bg']) => {
    switch (bg) {
      case 'white':
        return 'bg-white';
      case 'black':
        return 'bg-black';
      default:
        return 'bg-primary';
    }
  };

  const buttonStyles = getButtonStyles(size);
  const bgClass = getBackgroundColor(bg);
  const hoverBgClass =
    bg === 'white'
      ? 'hover:bg-[#F2F2F2]'
      : bg === 'black'
      ? 'hover:bg-grey'
      : 'hover:bg-primary-600';
  const activeBgClass =
    bg === 'white'
      ? 'active:bg-[#DDDDDD]'
      : bg === 'black'
      ? 'active:bg-grey-200'
      : 'active:bg-primary-700';
  const fontColorClass = `${color}`;

  const classes =
    'rounded-lg font-manrope transition-all duration-300 py-[15.5px]';

  return (
    <button
      {...otherProps}
      className={`${buttonStyles} ${bgClass} ${hoverBgClass} ${activeBgClass} ${fontColorClass} ${classes} ${className}`}
    >
      {text}
    </button>
  );
}
