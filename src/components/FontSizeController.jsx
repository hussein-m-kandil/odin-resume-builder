import Select from "./Select";

function FontSizeController({
  id,
  inputStyle,
  labelStyle,
  styleObject,
  onChangeStyle,
}) {
  const FONT_SIZES = [
    "xx-small",
    "x-small",
    "small",
    "medium",
    "large",
    "x-large",
    "xx-large",
  ];

  const defaultFontSize = FONT_SIZES.indexOf(styleObject.fontSize || "medium");

  const handleChangeFontSize = (e) => {
    if (e.target.value >= 0 && e.target.value < FONT_SIZES.length) {
      onChangeStyle({ ...styleObject, fontSize: FONT_SIZES[e.target.value] });
    }
  };

  return (
    <Select
      title="Font size"
      id={`${id}-fs-control`}
      value={defaultFontSize}
      onChange={handleChangeFontSize}
      inputStyle={inputStyle}
      labelStyle={labelStyle}
      options={FONT_SIZES}
    />
  );
}

export default FontSizeController;
