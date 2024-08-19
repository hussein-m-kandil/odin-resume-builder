import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import { EditModeContext } from "../context/EditModeContext";
import Entry from "./Entry";
import { initialData } from "../data/initialData";

function List({ id, initialListItems, ordered = false, ...props }) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const listStyle = { margin: "0" };

  if (editMode) listStyle.padding = "0";

  const listItems = initialListItems || initialData.education;

  const jsxListItems = listItems.map((listItem, i, arr) => {
    const initialStyle = { fontFamily: "sans-serif", color: appColors.dark };
    if (i === arr.length - 1) initialStyle.marginBottom = "2rem";
    return (
      <Entry
        {...props}
        key={listItem}
        id={`${id}-${i}`}
        initialText={listItem}
        initialStyle={initialStyle}
        forListItem={true}
      />
    );
  });
  return ordered ? (
    <ol style={listStyle}>{jsxListItems}</ol>
  ) : (
    <ul style={listStyle}>{jsxListItems}</ul>
  );
}

export default List;
