import Select from "./Select";

function FontFamilyController({
  id,
  inputStyle,
  labelStyle,
  styleObject,
  onChangeStyle,
}) {
  const FONT_FAMILIES = [
    "sans-serif",
    "Arial",
    "Helvetica",
    "Verdana",
    "serif",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "monospace",
    "Courier New",
    "cursive",
  ];

  const defaultFontFamily = FONT_FAMILIES.indexOf(
    styleObject.fontFamily || "Arial"
  );

  const handleChangeFontFamily = (e) => {
    if (e.target.value >= 0 && e.target.value < FONT_FAMILIES.length) {
      onChangeStyle({
        ...styleObject,
        fontFamily: FONT_FAMILIES[e.target.value],
      });
    }
  };

  return (
    <Select
      title="Font family"
      id={`${id}-ff-control`}
      value={defaultFontFamily}
      onChange={handleChangeFontFamily}
      inputStyle={inputStyle}
      labelStyle={labelStyle}
      options={FONT_FAMILIES}
    />
  );
}

export default FontFamilyController;
