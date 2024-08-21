import { useContext, useState } from "react";
import { useWindowInnerWidth } from "../hooks/useWindowInnerWidth";
import { AppColorsContext } from "../context/AppColorsContext";
import Paragraph from "./Paragraph";
import SubHead from "./SubHead";
import Select from "./Select";
import List from "./List";
import Line from "./Line";
import Date from "./Date";
import Head from "./Head";

function ControlPanel({ editMode, onToggleEditMode, onAddEntry }) {
  const appColors = useContext(AppColorsContext);

  const viewWidth = useWindowInnerWidth();

  const [entryTypeIndex, setEntryTypeIndex] = useState(0);

  const entryTypes = [
    { text: "Line", handleClick: () => onAddEntry(Line) },
    { text: "Date", handleClick: () => onAddEntry(Date) },
    { text: "Headline", handleClick: () => onAddEntry(Head) },
    { text: "Paragraph", handleClick: () => onAddEntry(Paragraph) },
    { text: "Subheadline", handleClick: () => onAddEntry(SubHead) },
    {
      text: "Ordered List",
      handleClick: () => onAddEntry(List, { ordered: true }),
    },
    { text: "Unordered List", handleClick: () => onAddEntry(List) },
  ];

  const handleChangeEntryType = (e) => setEntryTypeIndex(e.target.value);

  const handleAddNewEntry = () => entryTypes[entryTypeIndex].handleClick();

  const controllersStyle = {
    backgroundColor: appColors.lightAccent,
    color: appColors.accent,
    border: "none",
    minWidth: "5rem",
    fontSize: "large",
    fontWeight: "bold",
    textAlign: "center",
    padding: "0.25rem 0.5rem",
    boxShadow: "0 0 2px 0 #0007",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        justifyContent: "end",
        flexDirection: viewWidth < 400 ? "column" : "row",
      }}
    >
      <Select
        className={"grow-on-hover"}
        id={"entry-types-select"}
        title={"Entry types"}
        value={entryTypeIndex}
        inputStyle={controllersStyle}
        labelStyle={{ display: "flex" }}
        onChange={handleChangeEntryType}
        options={entryTypes.map((et) => et.text)}
      />
      <button
        type="button"
        style={controllersStyle}
        onClick={handleAddNewEntry}
      >
        Add
      </button>
      <button type="button" style={controllersStyle} onClick={onToggleEditMode}>
        {editMode ? "Submit" : "Edit"}
      </button>
    </div>
  );
}

export default ControlPanel;
