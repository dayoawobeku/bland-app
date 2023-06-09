interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  ariaLabel?: string;
}

export default function Input({
  type,
  value,
  onChange,
  placeholder,
  ariaLabel,
  ...otherProps
}: InputProps) {
  return (
    <input
      {...otherProps}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
}
