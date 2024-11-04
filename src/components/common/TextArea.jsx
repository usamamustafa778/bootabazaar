import React from "react";

const TextArea = ({
  name,
  label,
  onChange,
  onBlur,
  disabled = false,
  placeholder,
  value,
  error,
  className,
  style,
  defaultValue,
  inputStyle,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="inputLabel mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        className={`inputField ${inputStyle}`}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        style={style}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default TextArea;
