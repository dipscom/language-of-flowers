export default function Button({ className, disabled, step, cta }) {
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
