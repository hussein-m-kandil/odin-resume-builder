function Checkbox({
  id,
  labelText,
  labelStyle,
  checkboxStyle,
  checked,
  onChange,
  checkboxBeforeLabel = true,
}) {
  return (
    <label htmlFor={id} style={labelStyle}>
      {!checkboxBeforeLabel && labelText}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={checkboxStyle}
      />
      {checkboxBeforeLabel && labelText}
    </label>
  );
}

export default Checkbox;
