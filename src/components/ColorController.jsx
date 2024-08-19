function ColorController({
  id,
  inputStyle,
  labelStyle,
  styleObject,
  onChangeStyle,
}) {
  const handleChangeColor = (e) => {
    onChangeStyle({ ...styleObject, color: e.target.value });
  };

  return (
    <label htmlFor={`${id}-c-control`} title="Color" style={labelStyle}>
      <input
        id={`${id}-c-control`}
        type="color"
        value={styleObject.color || "#000000"}
        style={inputStyle}
        onChange={handleChangeColor}
      />
    </label>
  );
}

export default ColorController;
