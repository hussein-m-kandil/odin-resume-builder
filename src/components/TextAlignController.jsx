import Select from "./Select";

function TextAlignController({
  id,
  inputStyle,
  labelStyle,
  styleObject,
  onChangeStyle,
}) {
  const TEXT_ALIGNMENTS = ["left", "center", "right", "justify"];

  const defaultTextAlign = TEXT_ALIGNMENTS.indexOf(
    styleObject.textAlign || "left"
  );

  const handleChangeTextAlign = (e) => {
    if (e.target.value >= 0 && e.target.value < TEXT_ALIGNMENTS.length) {
      onChangeStyle({
        ...styleObject,
        textAlign: TEXT_ALIGNMENTS[e.target.value],
      });
    }
  };

  return (
    <Select
      title="Text alignment"
      id={`${id}-ta-control`}
      value={defaultTextAlign}
      onChange={handleChangeTextAlign}
      inputStyle={inputStyle}
      labelStyle={labelStyle}
      options={TEXT_ALIGNMENTS}
    />
  );
}

export default TextAlignController;
