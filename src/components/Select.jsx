function Select({ id, title, labelStyle, inputStyle, options, ...props }) {
  return (
    <label htmlFor={id} title={title} style={labelStyle}>
      <select id={id} style={inputStyle} {...props}>
        {options.map((opt, i) => (
          <option key={opt} value={i} style={inputStyle}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
