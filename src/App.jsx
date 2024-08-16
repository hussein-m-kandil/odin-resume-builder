import { createContext, Fragment, useContext, useState } from "react";
import { initialData } from "./data/initialData";

const AppColorsContext = createContext({});

const EditModeContext = createContext(false);

function Select({ options, ...props }) {
  return (
    <select {...props}>
      {options.map((o, i) => (
        <option key={o} value={i} style={props.style}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Checkbox({
  id,
  labelText,
  labelStyle,
  checkboxStyle,
  checked,
  onChange,
  checkboxBeforeLabel = true,
}) {
  return (
    <label htmlFor={id} style={labelStyle}>
      {!checkboxBeforeLabel && labelText}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={checkboxStyle}
      />
      {checkboxBeforeLabel && labelText}
    </label>
  );
}

function StyleController({
  id,
  styleObject,
  onStyleChange,
  withMarginBottom = true,
}) {
  const appColors = useContext(AppColorsContext);
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

  const FONT_SIZES = [
    "xx-small",
    "x-small",
    "small",
    "medium",
    "large",
    "x-large",
    "xx-large",
  ];

  const defaultFontFamily = FONT_FAMILIES.indexOf(
    styleObject.fontFamily || "Arial"
  );

  const defaultFontSize = FONT_SIZES.indexOf(styleObject.fontSize || "medium");

  const defaultMarginBottomDigit = !styleObject.marginBottom
    ? 1
    : Number(`${styleObject.marginBottom}`.match(/^\d+(\.\d+)?/)[0]);

  const inputMinHeight = "2em";

  const commonStyle = {
    minHeight: inputMinHeight,
    fontSize: "small",
    fontWeight: "bold",
    accentColor: appColors.accent || "auto",
  };

  const containerStyle = {
    width: "100%",
    minHeight: inputMinHeight,
    marginBottom: "0.25rem",
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "start",
  };

  const labelStyle = { display: "flex", alignItems: "center" };

  const checkboxStylesProps = {
    labelStyle: {
      ...commonStyle,
      ...labelStyle,
    },
    checkboxStyle: {
      height: inputMinHeight,
      width: inputMinHeight,
      marginTop: "0",
      marginLeft: "0",
      marginBottom: "0",
      marginRight: "0.25rem",
    },
  };

  const handleChangeFontFamily = (e) => {
    if (e.target.value >= 0 && e.target.value < FONT_FAMILIES.length) {
      onStyleChange({
        ...styleObject,
        fontFamily: FONT_FAMILIES[e.target.value],
      });
    }
  };

  const handleChangeFontSize = (e) => {
    if (e.target.value >= 0 && e.target.value < FONT_SIZES.length) {
      onStyleChange({ ...styleObject, fontSize: FONT_SIZES[e.target.value] });
    }
  };

  const handleChangeBoldFont = (e) => {
    onStyleChange({
      ...styleObject,
      fontWeight: e.target.checked ? "bold" : "normal",
    });
  };

  const handleChangeItalicFont = (e) => {
    onStyleChange({
      ...styleObject,
      fontStyle: e.target.checked ? "italic" : "normal",
    });
  };

  const handleChangeColor = (e) => {
    onStyleChange({ ...styleObject, color: e.target.value });
  };

  const handleChangeMarginBottom = (e) => {
    if (e.target.value >= 0 && e.target.value <= 5) {
      onStyleChange({
        ...styleObject,
        marginBottom: `${e.target.value}${e.target.value > 0 ? "rem" : ""}`,
      });
    }
  };

  return (
    <div style={containerStyle}>
      <Select
        title="Font family"
        id={`${id}-ff-control`}
        value={defaultFontFamily}
        onChange={handleChangeFontFamily}
        style={commonStyle}
        options={FONT_FAMILIES}
      />
      <Select
        title="Font size"
        id={`${id}-fs-control`}
        value={defaultFontSize}
        onChange={handleChangeFontSize}
        style={commonStyle}
        options={FONT_SIZES}
      />
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
      <label htmlFor={`${id}-c-control`} title="Color" style={labelStyle}>
        <input
          id={`${id}-c-control`}
          type="color"
          value={styleObject.color || "#000000"}
          style={commonStyle}
          onChange={handleChangeColor}
        />
      </label>
      {withMarginBottom && (
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
            style={commonStyle}
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
      )}
    </div>
  );
}

function TextEditor({
  id,
  text,
  maxLength,
  style,
  onChange,
  textAreaInput = false,
}) {
  const appColors = useContext(AppColorsContext);

  const customProps = {
    id: `${id}-editor`,
    maxLength,
    value: text,
    placeholder: "Edit entry...",
    onChange: onChange,
  };

  const commonStyle = {
    ...style,
    width: "100%",
    marginTop: "0",
    marginRight: "0",
    marginBottom: "0",
    marginLeft: "0",
    padding: "0.75rem",
    display: "block",
  };

  return (
    <div
      style={{
        marginBottom: style.marginBottom,
        position: "relative",
      }}
    >
      <label htmlFor={customProps.id} title="Entry editor">
        {textAreaInput ? (
          <textarea
            {...customProps}
            rows={7}
            style={{
              ...commonStyle,
              resize: "none",
              overflow: "auto",
            }}
          />
        ) : (
          <input {...customProps} type="text" style={commonStyle} />
        )}
      </label>
      <span
        style={{
          marginLeft: "0.5rem",
          fontSize: "x-small",
          position: "absolute",
          bottom: "0.25rem",
          right: "0.5rem",
          color: appColors.mid,
        }}
      >
        {`${text.length}/${maxLength}`}
      </span>
    </div>
  );
}

const ENTRY_TYPES = {
  LINE: "L",
  HEAD: "H",
  SUBHEAD: "S",
  DATE: "D",
  PARAGRAPH: "P",
  LIST_ITEM: "LI",
};

function Entry({
  id,
  initialText,
  initialStyle,
  entryType,
  forSubEntry = false,
}) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const [text, setText] = useState(initialText);
  const [style, setStyle] = useState({
    marginBottom: "0.25rem",
    ...initialStyle,
  });

  const TEXT_MAX_LENGTH = entryType === ENTRY_TYPES.PARAGRAPH ? 999 : 80;

  const handleChangeInput = (e) => {
    const lenIsOk = e.target.value.length <= TEXT_MAX_LENGTH;
    setText((t) => (lenIsOk ? e.target.value : t));
  };

  const editModeStyle = {
    backgroundColor: appColors.lightAccent,
    padding: "1rem",
    boxShadow: "0 0 3px 0 #0007",
    borderRadius: "1rem",
  };

  const styleController = (
    <StyleController
      id={id}
      styleObject={style}
      onStyleChange={(newStyle) => {
        setStyle((recentStyle) => ({ ...recentStyle, ...newStyle }));
      }}
      withMarginBottom={!forSubEntry}
    />
  );

  const textEditor = (
    <TextEditor
      id={id}
      text={text}
      maxLength={TEXT_MAX_LENGTH}
      style={style}
      onChange={handleChangeInput}
      textAreaInput={entryType === ENTRY_TYPES.PARAGRAPH}
    />
  );

  switch (entryType) {
    case ENTRY_TYPES.LINE:
    case ENTRY_TYPES.HEAD:
    case ENTRY_TYPES.PARAGRAPH:
    case ENTRY_TYPES.LIST_ITEM:
      return editMode ? (
        <div
          style={{
            ...editModeStyle,
            margin: "2rem auto",
          }}
        >
          {styleController}
          {textEditor}
        </div>
      ) : entryType === ENTRY_TYPES.LIST_ITEM ? (
        <li style={style}>{text}</li>
      ) : (
        <div style={style}>{text}</div>
      );
    case ENTRY_TYPES.SUBHEAD:
    case ENTRY_TYPES.DATE:
      return editMode ? (
        <div
          style={{
            ...editModeStyle,
            flexGrow: "1",
            flexBasis: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {styleController}
          {textEditor}
        </div>
      ) : (
        <div style={style}>{text}</div>
      );
    default:
      throw TypeError("Invalid 'Entry' type!");
  }
}

function Line({ initialText = "Line", ...props }) {
  return (
    <Entry {...props} initialText={initialText} entryType={ENTRY_TYPES.LINE} />
  );
}

function Head({ initialText = "Headline", ...props }) {
  const appColors = useContext(AppColorsContext);
  const initialStyle = {
    fontSize: "x-large",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: appColors.accent,
  };

  return (
    <Entry
      {...props}
      initialText={initialText}
      initialStyle={initialStyle}
      entryType={ENTRY_TYPES.HEAD}
    />
  );
}

function Paragraph({ initialText, ...props }) {
  const appColors = useContext(AppColorsContext);
  initialText =
    initialText ||
    "Lorem ipsum dolor sit amet, " +
      "consectetuer adipiscing elit, " +
      "sed diam nonummy nibh euismod tincidunt " +
      "ut laoreet dolore magna aliquam erat volutpat.";
  const initialStyle = {
    marginBottom: "2rem",
    color: appColors.dark,
  };
  return (
    <Entry
      {...props}
      initialText={initialText}
      initialStyle={initialStyle}
      entryType={ENTRY_TYPES.PARAGRAPH}
    />
  );
}

/**
 * Returns the current window's inner width
 * @returns {number}
 */
function useWindowInnerWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = (e) => {
    setWidth(e.target.innerWidth);
  };

  window.addEventListener("resize", handleResize, { passive: true });

  return width;
}

/**
 * Returns "wrap" if window's inner width less that the given "maxWidth"
 * Otherwise, returns "nowrap"
 * @param {number} maxWidth
 * @returns {string}
 */

function useFlexWrap(maxWidth) {
  const windowInnerWidth = useWindowInnerWidth();

  return windowInnerWidth < maxWidth ? "wrap" : "nowrap";
}

// TODO: Create a ExtendedEntry component to avoid the redundancy in SubHead & Date
// TODO: Fix a bug in edit margin for an extended entry

function SubHead({
  id,
  initialText = "Organization, Location",
  initialExtensionText = "Title",
  ...props
}) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const mainContentStyle = { fontSize: "large", fontWeight: "bold" };
  const extensionStyle = {
    fontSize: "large",
    fontWeight: "normal",
    fontStyle: "italic",
    color: appColors.mid,
  };
  const containerStyle = {
    display: "flex",
    flexWrap: useFlexWrap(480),
    gap: `${editMode ? "1rem" : "0.5rem"}`,
  };

  if (editMode) containerStyle.margin = "2rem auto";

  return (
    <div style={containerStyle}>
      <Entry
        {...props}
        id={id}
        initialText={initialText}
        initialStyle={mainContentStyle}
        entryType={ENTRY_TYPES.SUBHEAD}
      />
      {initialExtensionText && (
        <>
          {!editMode && <div style={extensionStyle}>-</div>}
          <Entry
            {...props}
            id={`${id}-ext`}
            initialText={initialExtensionText}
            initialStyle={extensionStyle}
            entryType={ENTRY_TYPES.SUBHEAD}
            forSubEntry={true}
          />
        </>
      )}
    </div>
  );
}

// TODO: Think about adding DateEditor to use it for date instead of TextEditor

function Date({
  id,
  initialFrom = "MONTH 20XX",
  initialTo = "PRESENT",
  ...props
}) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const mainContentStyle = {
    fontSize: "small",
    marginBottom: "1rem",
    color: appColors.mid,
  };
  const containerStyle = {
    display: "flex",
    flexWrap: useFlexWrap(480),
    gap: `${editMode ? "1rem" : "0.5rem"}`,
  };

  if (editMode) containerStyle.margin = "2rem auto";

  return (
    <div style={containerStyle}>
      <Entry
        {...props}
        id={id}
        initialText={initialFrom}
        initialStyle={mainContentStyle}
        entryType={ENTRY_TYPES.DATE}
      />
      {!editMode && <div style={mainContentStyle}>-</div>}
      <Entry
        {...props}
        id={`${id}-ext`}
        initialText={initialTo}
        initialStyle={mainContentStyle}
        entryType={ENTRY_TYPES.DATE}
        forSubEntry={true}
      />
    </div>
  );
}

function List({ id, initialListItems, ordered = false, ...props }) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const listStyle = { marginBottom: "2rem" };

  if (editMode) listStyle.padding = "0";

  const jsxListItems = initialListItems.map((listItem, i) => (
    <Entry
      {...props}
      key={listItem}
      id={`${id}-${i}`}
      initialText={listItem}
      initialStyle={{ color: appColors.dark }}
      entryType={ENTRY_TYPES.LIST_ITEM}
    />
  ));
  return ordered ? (
    <ol style={listStyle}>{jsxListItems}</ol>
  ) : (
    <ul style={listStyle}>{jsxListItems}</ul>
  );
}

function Header({ children }) {
  const appColors = useContext(AppColorsContext);

  return (
    <div
      className="header"
      style={{
        backgroundColor: appColors.accent,
        position: "sticky",
        zIndex: "1000",
        width: "100%",
        top: "0",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: "1",
        }}
      >
        <h1
          style={{
            color: appColors.light,
            margin: "0",
          }}
        >
          Odin Résumé Builder
        </h1>
        {children}
      </div>
    </div>
  );
}

function App() {
  // TODO: Scroll to the same place after toggle edit mode
  const [editMode, setEditMode] = useState(false);
  const handleTogglingEditMode = () => {
    setEditMode((iem) => !iem);
  };

  const appColors = {
    accent: "#00ab44",
    lightAccent: "#fdfdfd",
    light: "#ffffff",
    mid: "#7f7f7f",
    dark: "#000000",
  };

  let entriesCount = 0;
  const generateId = () => `entry-${++entriesCount}`;

  return (
    <AppColorsContext.Provider value={appColors}>
      <EditModeContext.Provider value={editMode}>
        <Header>
          <button
            type="button"
            className="edit-btn"
            onClick={handleTogglingEditMode}
            style={{
              width: "6rem",
              height: "3rem",
              color: appColors.dark,
              backgroundColor: appColors.light,
            }}
          >
            {editMode ? "Submit" : "Edit"}
          </button>
        </Header>
        <div style={{ padding: "1rem" }}>
          <Line
            id={generateId()}
            initialText={initialData.name}
            initialStyle={{
              fontFamily: "Arial",
              fontSize: "xx-large",
              fontWeight: "bold",
              color: appColors.dark,
            }}
          />
          <Line
            id={generateId()}
            initialText={initialData.title}
            initialStyle={{
              fontFamily: "Arial",
              fontSize: "x-large",
              color: appColors.accent,
            }}
          />
          {initialData.contact.map((entry, i, arr) => {
            const initialStyle = { fontFamily: "Arial", color: appColors.mid };
            if (i === arr.length - 1) initialStyle.marginBottom = "2rem";
            return (
              <Line
                id={generateId()}
                key={entry}
                initialText={entry}
                initialStyle={initialStyle}
              />
            );
          })}
          <Head id={generateId()} initialText={"SKILLS"} />
          <Paragraph id={generateId()} initialText={initialData.skills} />
          <Head id={generateId()} initialText={"EXPERIENCE"} />
          {initialData.experience.map((entry) => (
            <Fragment key={`${entry.org} - ${entry.title}`}>
              <SubHead
                id={generateId()}
                initialText={entry.org}
                initialExtensionText={entry.title}
              />
              <Date id={generateId()} />
              <List id={generateId()} initialListItems={entry.details} />
            </Fragment>
          ))}
          <Head id={generateId()} initialText={"EDUCATION"} />
          {initialData.education.map((entry) => (
            <Fragment key={`${entry.org} - ${entry.deg}`}>
              <SubHead
                id={generateId()}
                initialText={entry.org}
                initialExtensionText={entry.deg}
              />
              <Date id={generateId()} />
              <Paragraph id={generateId()} initialText={entry.about} />
            </Fragment>
          ))}
          <Head id={generateId()} initialText={"AWARDS"} />
          <List id={generateId()} initialListItems={initialData.awards} />
        </div>
      </EditModeContext.Provider>
    </AppColorsContext.Provider>
  );
}

export default App;
