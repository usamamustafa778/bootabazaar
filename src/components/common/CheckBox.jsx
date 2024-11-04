import React from "react";

const Checkbox = ({
  label,
  checked,
  onChange,
  className,
  boxStyle,
  disabled,
  boxSize,
}) => {
  return (
    <label
      className={`flex items-center gap-2 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }  ${className}`}
    >
      <input
        disabled={disabled}
        type="checkbox"
        className={`form-checkbox text-secondary cursor-pointer disabled:cursor-not-allowed ${boxStyle} ${
          boxSize ? boxSize : "h-3 w-3"
        }`}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
