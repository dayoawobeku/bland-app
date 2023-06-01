interface InputProps {
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
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
}
