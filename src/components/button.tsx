interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'large' | 'medium' | 'zero' | 'custom';
  text?: string;
  bg?: 'default' | 'white' | 'black' | 'grey';
  color?: string;
  padding?: string;
}

export default function Button({
  size = 'default',
  text = 'Get started',
  bg = 'default',
  color = 'text-grey-800',
  padding = '',
  className = '',
  ...otherProps
}: ButtonProps) {
  const getButtonStyles = (size: ButtonProps['size']) => {
    if (size === 'custom') {
      return padding;
    }
    switch (size) {
      case 'large':
        return 'sm:px-[132px]';
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
      case 'grey':
        return 'bg-grey-800';
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
      : bg === 'grey'
      ? 'hover:bg-[#1f1f1f]'
      : 'hover:bg-primary-600';
  const activeBgClass =
    bg === 'white'
      ? 'active:bg-[#DDDDDD]'
      : bg === 'black'
      ? 'active:bg-grey-200'
      : bg === 'grey'
      ? 'active:bg-[#0d0d0d] focus:bg-[#0d0d0d]'
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
