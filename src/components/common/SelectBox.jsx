const SelectBox = ({
  name,
  error,
  label,
  value,
  onBlur,
  options,
  onChange,
  required,
  className,
  inputStyle,
  buttonClass,
  placeholder,
  defaultValue,
  disabled = false,
}) => {
  return (
    <div className={`cursor-pointer ${className}`}>
      {label && (
        <label className="inputLabel mb-1 font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <div className={`btnOutlined ${buttonClass}`}>
        <select
          name={name}
          value={value}
          onBlur={onBlur}
          aria-label={label}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`pr-2 outline-none bg-transparent cursor-pointer ${inputStyle}`}
        >
          {options.map((item, index) => (
            <option
              key={index}
              className="cursor-pointer text-black dark:text-white dark:bg-gray-800"
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
};

export default SelectBox;
