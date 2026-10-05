function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error
}) {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;