import { ClipboardCheck, Eye, EyeOff, Mail, User } from "lucide-react";
import { useState } from "react";

const InputField = ({
  name,
  label,
  onChange,
  onBlur,
  type,
  disabled = false,
  placeholder,
  value,
  required,
  max,
  min,
  error,
  className,
  accept,
  onKeyDown,
  copy,
  defaultValue,
  inputStyle,
  style,
  labelStyle,
  autoFocus,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`inputLabel mb-1 ${labelStyle}`} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative flex items-center gap-4">
        <input
          type={passwordVisible ? "text" : type || "text"}
          disabled={disabled}
          name={name}
          max={max}
          min={min}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`inputField disabled:cursor-not-allowed ${
            error ? "border-red-300" : ""
          } ${inputStyle}`}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          accept={accept}
          style={style}
          autoFocus={autoFocus}
        />

        {copy && (
          <button type="button" onClick={togglePasswordVisibility}>
            <ClipboardCheck className="h-5 w-5 text-gray-500" />
          </button>
        )}

        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
        {type === "username" && (
          <button className="absolute inset-y-0 right-0 px-3 py-2">
            <User className="h-5 w-5 text-gray-500" />
          </button>
        )}
        {type === "email" && (
          <button className="absolute inset-y-0 right-0 px-3 py-2">
            <Mail className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputField;
