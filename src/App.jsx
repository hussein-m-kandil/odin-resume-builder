import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialData } from "./data/initialData";

const EditModeContext = createContext(false);

const AppColorsContext = createContext({});

const AppDefaultsContext = createContext({});

function Select({ id, title, labelStyle, inputStyle, options, ...props }) {
  return (
    <label htmlFor={id} title={title} style={labelStyle}>
      <select id={id} style={inputStyle} {...props}>
        {options.map((opt, i) => (
          <option key={opt} value={i} style={inputStyle}>
            {opt}
          </option>
        ))}
      </select>
    </label>
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

function ColorController({
  id,
  inputStyle,
  labelStyle,
  styleObject,
  onChangeStyle,
}) {
  const handleChangeColor = (e) => {
    onChangeStyle({ ...styleObject, color: e.target.value });
  };

  return (
    <label htmlFor={`${id}-c-control`} title="Color" style={labelStyle}>
      <input
        id={`${id}-c-control`}
        type="color"
        value={styleObject.color || "#000000"}
        style={inputStyle}
        onChange={handleChangeColor}
      />
    </label>
  );
}

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

function StyleController({
  id,
  styleObject,
  onChangeStyle,
  withColorController = true,
  withFontSizeController = true,
  withFontStyleController = true,
  withFontFamilyController = true,
  withMarginBottomController = true,
}) {
  const appColors = useContext(AppColorsContext);
  const appDefaultsContext = useContext(AppDefaultsContext);

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
    marginBottom: appDefaultsContext.marginBottom,
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

  const commonControlProps = {
    id: id,
    labelStyle: labelStyle,
    inputStyle: commonStyle,
    styleObject: styleObject,
    onChangeStyle: onChangeStyle,
  };

  return (
    <div style={containerStyle}>
      {withFontFamilyController && (
        <FontFamilyController {...commonControlProps} />
      )}
      {withFontSizeController && <FontSizeController {...commonControlProps} />}
      {withFontStyleController && (
        <FontStyleController
          id={id}
          {...checkboxStylesProps}
          styleObject={styleObject}
          onChangeStyle={onChangeStyle}
        />
      )}
      {withColorController && <ColorController {...commonControlProps} />}
      {withMarginBottomController && (
        <MarginBottomController {...commonControlProps} />
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

function EditCard({
  id,
  entryStyle,
  entryText,
  entryTextMaxLength,
  onChangeStyle,
  onChangeText,
  editCardStyle,
  textAreaEditor = false,
  ...styleControlFlags
}) {
  const appColors = useContext(AppColorsContext);

  return (
    <div
      style={{
        backgroundColor: appColors.lightAccent,
        boxShadow: "0 0 3px 0 #0007",
        borderRadius: "1rem",
        padding: "1rem",
        ...editCardStyle,
      }}
    >
      <StyleController
        id={id}
        styleObject={entryStyle}
        onChangeStyle={onChangeStyle}
        {...styleControlFlags}
      />
      <TextEditor
        id={id}
        text={entryText}
        maxLength={entryTextMaxLength}
        style={entryStyle}
        onChange={onChangeText}
        textAreaInput={textAreaEditor}
      />
    </div>
  );
}

function Entry({
  id,
  initialText,
  initialStyle,
  forParagraph = false,
  forListItem = false,
}) {
  const editMode = useContext(EditModeContext);
  const appDefaultsContext = useContext(AppDefaultsContext);

  const [text, setText] = useState(initialText);
  const [style, setStyle] = useState({
    marginBottom: appDefaultsContext.marginBottom,
    ...initialStyle,
  });

  const TEXT_MAX_LENGTH = forParagraph
    ? appDefaultsContext.textMaxLength.paragraph
    : appDefaultsContext.textMaxLength.line;

  const handleChangeText = (e) => {
    const lenIsOk = e.target.value.length <= TEXT_MAX_LENGTH;
    setText((t) => (lenIsOk ? e.target.value : t));
  };

  const handleChangeStyle = (newStyle) => {
    setStyle((recentStyle) => ({ ...recentStyle, ...newStyle }));
  };

  const editCardCommonProps = {
    id: id,
    entryText: text,
    entryStyle: style,
    editCardStyle: { margin: appDefaultsContext.editCardMargin },
    entryTextMaxLength: TEXT_MAX_LENGTH,
    onChangeStyle: handleChangeStyle,
    onChangeText: handleChangeText,
    textAreaEditor: forParagraph,
    withMarginBottomController: true,
  };

  return editMode ? (
    <EditCard {...editCardCommonProps} />
  ) : forListItem ? (
    <li style={style}>{text}</li>
  ) : (
    <div style={style}>{text}</div>
  );
}

function Line({ initialText = "Line", ...props }) {
  return <Entry {...props} initialText={initialText} />;
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
    <Entry {...props} initialText={initialText} initialStyle={initialStyle} />
  );
}

function Paragraph({ initialText = initialData.experience, ...props }) {
  const appColors = useContext(AppColorsContext);
  const initialStyle = {
    marginBottom: "2rem",
    color: appColors.dark,
  };
  return (
    <Entry
      {...props}
      initialText={initialText}
      initialStyle={initialStyle}
      forParagraph={true}
    />
  );
}

function useWindowInnerWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };

    const listenerOptions = { passive: true };

    window.addEventListener("resize", handleResize, listenerOptions);

    return () => {
      window.removeEventListener("resize", handleResize, listenerOptions);
    };
  }, []);

  return width;
}

function ExtendedEntry({
  id,
  initialMainText,
  initialExtensionText,
  initialMainStyle,
  initialExtensionStyle,
}) {
  const editMode = useContext(EditModeContext);
  const appDefaultsContext = useContext(AppDefaultsContext);

  const TEXT_MAX_LENGTH = appDefaultsContext.textMaxLength.line;

  const windowInnerWidth = useWindowInnerWidth();

  const [mainText, setMainText] = useState(initialMainText);
  const [extensionText, setExtensionText] = useState(initialExtensionText);
  const [mainStyle, setMainStyle] = useState({
    marginBottom: appDefaultsContext.marginBottom,
    ...initialMainStyle,
  });
  const [extensionStyle, setExtensionStyle] = useState({
    ...initialExtensionStyle,
    marginBottom: mainStyle.marginBottom,
  });

  const isValidLength = (text) => text.length <= TEXT_MAX_LENGTH;

  const handleChangeMainText = (e) => {
    if (isValidLength(e.targe.value)) {
      setMainText(() => e.target.value);
    }
  };

  const handleChangeExtensionText = (e) => {
    if (isValidLength(e.targe.value)) {
      setExtensionText(() => e.target.value);
    }
  };

  const handleChangeMainStyle = (newStyle) => {
    setMainStyle((recentStyle) => ({ ...recentStyle, ...newStyle }));
    setExtensionStyle((recentStyle) => ({
      ...recentStyle,
      marginBottom: newStyle.marginBottom,
      fontFamily: newStyle.fontFamily,
      fontSize: newStyle.fontSize,
    }));
  };

  const handleChangeExtensionStyle = (newStyle) => {
    setExtensionStyle((recentStyle) => ({
      ...recentStyle,
      ...newStyle,
    }));
  };

  const containerStyle = {
    display: "flex",
    flexWrap: windowInnerWidth < 480 ? "wrap" : "nowrap",
    gap: `${editMode ? "1rem" : "0.5rem"}`,
  };

  if (editMode) containerStyle.margin = appDefaultsContext.editCardMargin;

  const editCardStyle = {
    flexGrow: "1",
    flexBasis: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const editCardCommonProps = {
    editCardStyle: editCardStyle,
    entryTextMaxLength: TEXT_MAX_LENGTH,
    textAreaEditor: false,
  };

  return (
    <div style={containerStyle}>
      {editMode ? (
        <>
          <EditCard
            {...editCardCommonProps}
            id={id}
            entryText={mainText}
            entryStyle={mainStyle}
            onChangeStyle={handleChangeMainStyle}
            onChangeText={handleChangeMainText}
          />
          <EditCard
            {...editCardCommonProps}
            id={`${id}-ext`}
            entryText={extensionText}
            entryStyle={extensionStyle}
            onChangeStyle={handleChangeExtensionStyle}
            onChangeText={handleChangeExtensionText}
            withMarginBottomController={false}
            withFontFamilyController={false}
            withFontSizeController={false}
          />
        </>
      ) : (
        <>
          <div style={mainStyle}>{mainText}</div>
          {initialExtensionText && (
            <>
              {!editMode && <div style={extensionStyle}>-</div>}
              <div style={extensionStyle}>{extensionText}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function SubHead({
  id,
  initialText = "Organization, Location",
  initialExtensionText = "Title",
}) {
  const appColors = useContext(AppColorsContext);

  const extensionStyle = {
    fontSize: "large",
    fontWeight: "normal",
    fontStyle: "italic",
    color: appColors.mid,
  };

  return (
    <ExtendedEntry
      id={id}
      initialMainText={initialText}
      initialExtensionText={initialExtensionText}
      initialMainStyle={{ fontSize: "large", fontWeight: "bold" }}
      initialExtensionStyle={extensionStyle}
    />
  );
}

// TODO: Think about adding DateEditor to use it for date instead of TextEditor

function Date({ id, initialFrom = "MONTH 20XX", initialTo = "PRESENT" }) {
  const appColors = useContext(AppColorsContext);

  const mainStyle = {
    fontSize: "small",
    marginBottom: "1rem",
    color: appColors.mid,
  };

  return (
    <ExtendedEntry
      id={id}
      initialMainText={initialFrom}
      initialExtensionText={initialTo}
      initialMainStyle={mainStyle}
      initialExtensionStyle={mainStyle}
    />
  );
}

function List({ id, initialListItems, ordered = false }) {
  const editMode = useContext(EditModeContext);
  const appColors = useContext(AppColorsContext);

  const listStyle = { margin: "0" };

  if (editMode) listStyle.padding = "0";

  const jsxListItems = initialListItems.map((listItem, i, arr) => {
    const initialStyle = { color: appColors.dark };
    if (i === arr.length - 1) initialStyle.marginBottom = "2rem";
    return (
      <Entry
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

  const appDefaultsContext = {
    textMaxLength: {
      line: 80,
      paragraph: 999,
    },
    editCardMargin: "2rem auto",
    marginBottom: "0.25rem",
  };

  let entriesCount = 0;
  const generateId = () => `entry-${++entriesCount}`;

  return (
    <AppDefaultsContext.Provider value={appDefaultsContext}>
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
              const initialStyle = {
                fontFamily: "Arial",
                color: appColors.mid,
              };
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
    </AppDefaultsContext.Provider>
  );
}

export default App;
