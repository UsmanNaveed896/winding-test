import { wrap, increment, decrement } from "./numeric-input.module.scss"

export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  ...props
}) {
  return (
    <div className={wrap}>
      <button
        disabled={disabled}
        className={decrement}
        aria-label="Decrement"
        onClick={onDecrement}
      >
        <span>-</span>
      </button>
      <input
        disabled={disabled}
        type="numeric"
        {...props}
      />
      <button
        disabled={disabled}
        className={increment}
        aria-label="Increment"
        onClick={onIncrement}
      >
        <span>+</span>
      </button>
    </div>
  )
}
