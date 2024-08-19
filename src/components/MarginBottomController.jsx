import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";

function MarginBottomController({
  id,
  inputStyle,
  labelStyle,
  styleObject,
  onChangeStyle,
}) {
  const appColors = useContext(AppColorsContext);

  const defaultMarginBottomDigit = !styleObject.marginBottom
    ? 1
    : Number(`${styleObject.marginBottom}`.match(/^\d+(\.\d+)?/)[0]);

  const handleChangeMarginBottom = (e) => {
    if (e.target.value >= 0 && e.target.value <= 5) {
      onChangeStyle({
        ...styleObject,
        marginBottom: `${e.target.value}${e.target.value > 0 ? "rem" : ""}`,
      });
    }
  };

  return (
    <label
      htmlFor={`${id}-mb-control`}
      title="Margin Bottom"
      style={labelStyle}
    >
      <input
        type="range"
        id={`${id}-mb-control`}
        min={0}
        max={5}
        step={0.25}
        value={defaultMarginBottomDigit}
        style={inputStyle}
        onChange={handleChangeMarginBottom}
      />
      <span
        style={{
          fontSize: "x-small",
          width: "1.75rem",
          marginLeft: "0.25rem",
          color: appColors.mid,
        }}
      >
        {defaultMarginBottomDigit}x
      </span>
    </label>
  );
}

export default MarginBottomController;
