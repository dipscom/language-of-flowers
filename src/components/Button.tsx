interface ButtonProps {
  className?: string;
  disabled?: boolean;
  step: () => void;
  cta: string;
}

export default function Button({
  className,
  disabled,
  step,
  cta,
}: ButtonProps) {
  return (
    <button
      className={className}
      disabled={disabled}
      type="button"
      onClick={step}
    >
      {cta}
    </button>
  );
}
