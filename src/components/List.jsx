import { useContext, useEffect, useRef, useState } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import { EditModeContext } from "../context/EditModeContext";
import Entry from "./Entry";

const createListItem = () => `List item...`;

const genListItemId = (listId, index) => {
  return `${listId}-${index}`;
};

function List({
  id,
  initialListItems,
  onDeleteEntry,
  ordered = false,
  ...props
}) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const addListItemButtonRef = useRef(null);

  const [listItems, setListItems] = useState(
    initialListItems || [createListItem()]
  );

  const handleAddListItem = (e) => {
    setListItems((lis) => [...lis, createListItem()]);
    addListItemButtonRef.current = e.target;
  };

  const handleDeleteListItem = (listItemId) => {
    const updatedListItems = listItems.filter(
      (li, i) => genListItemId(id, i) !== listItemId
    );
    if (updatedListItems.length === 0) {
      onDeleteEntry(id);
    } else setListItems(updatedListItems);
  };

  const jsxListContent = listItems.map((listItem, i, arr) => {
    const initialStyle = { fontFamily: "sans-serif", color: appColors.dark };
    if (i === arr.length - 1) initialStyle.marginBottom = "2rem";
    return (
      <Entry
        {...props}
        key={`${listItem}_${i}`}
        id={genListItemId(id, i)}
        initialText={listItem}
        initialStyle={initialStyle}
        onDeleteEntry={handleDeleteListItem}
        forListItem={true}
      />
    );
  });

  const listStyle = { margin: "0", listStylePosition: "inside" };

  if (editMode) {
    listStyle.padding = "0";
    // Inject in the list items's JSX, a button that adds a list item
    const buttonContent = "Add List Item";
    jsxListContent.push(
      <div
        key={buttonContent}
        style={{ display: "flex", justifyContent: "end" }}
      >
        <button
          type="button"
          style={{
            border: "none",
            borderRadius: "0.5rem",
            boxShadow: "0 0 3px 0 #0007",
            color: appColors.accent,
            backgroundColor: appColors.lightAccent,
          }}
          onClick={handleAddListItem}
        >
          {buttonContent}
        </button>
      </div>
    );
  }

  // Scroll to the `add button`, and focus on last added item only in edit mode
  useEffect(() => {
    if (addListItemButtonRef.current) {
      const addButton = addListItemButtonRef.current;
      const lastListItem = addButton.parentElement.previousSibling;
      lastListItem.querySelector("input[type='text']:last-of-type").focus();
      addButton.scrollIntoView(false);
    }
  }, [listItems]);

  return ordered ? (
    <ol style={listStyle}>{jsxListContent}</ol>
  ) : (
    <ul style={listStyle}>{jsxListContent}</ul>
  );
}

export default List;
