import { useContext, useState } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import { EditModeContext } from "../context/EditModeContext";
import Entry from "./Entry";
import { initialData } from "../data/initialData";

function List({
  id,
  initialListItems,
  onDeleteEntry,
  ordered = false,
  ...props
}) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const genListItemId = (listId, index) => {
    return `${listId}-${index}`;
  };

  const deleteMe = () => onDeleteEntry(id);

  const [listItems, setListItems] = useState(
    initialListItems || initialData.awards
  );

  const handleDeleteListItem = (listItemId) => {
    const updatedListItems = listItems.filter(
      (li, i) => genListItemId(id, i) !== listItemId
    );
    if (updatedListItems.length === 0) deleteMe();
    else setListItems(updatedListItems);
  };

  const jsxListItems = listItems.map((listItem, i, arr) => {
    const initialStyle = { fontFamily: "sans-serif", color: appColors.dark };
    if (i === arr.length - 1) initialStyle.marginBottom = "2rem";
    return (
      <Entry
        {...props}
        key={listItem}
        id={genListItemId(id, i)}
        initialText={listItem}
        initialStyle={initialStyle}
        onDeleteEntry={handleDeleteListItem}
        forListItem={true}
      />
    );
  });

  const listStyle = { margin: "0" };

  if (editMode) listStyle.padding = "0";

  return ordered ? (
    <ol style={listStyle}>{jsxListItems}</ol>
  ) : (
    <ul style={listStyle}>{jsxListItems}</ul>
  );
}

export default List;
