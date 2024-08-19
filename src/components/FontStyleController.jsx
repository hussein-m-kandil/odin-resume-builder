import Checkbox from "./Checkbox";

function FontStyleController({
  id,
  styleObject,
  onChangeStyle,
  ...checkboxStylesProps
}) {
  const handleChangeBoldFont = (e) => {
    onChangeStyle({
      ...styleObject,
      fontWeight: e.target.checked ? "bold" : "normal",
    });
  };

  const handleChangeItalicFont = (e) => {
    onChangeStyle({
      ...styleObject,
      fontStyle: e.target.checked ? "italic" : "normal",
    });
  };

  return (
    <>
      <Checkbox
        id={`${id}-bold-control`}
        labelText={"Bold"}
        {...checkboxStylesProps}
        checked={styleObject.fontWeight === "bold"}
        onChange={handleChangeBoldFont}
      />
      <Checkbox
        id={`${id}-italic-control`}
        labelText={"Italic"}
        {...checkboxStylesProps}
        checked={styleObject.fontStyle === "italic"}
        onChange={handleChangeItalicFont}
      />
    </>
  );
}

export default FontStyleController;
