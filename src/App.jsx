import { useEffect, useState } from "react";
import { initialEntriesData } from "./initialEntriesData";
import { AppDefaultsContext } from "./context/AppDefaultsContext";
import { AppColorsContext } from "./context/AppColorsContext";
import { EditModeContext } from "./context/EditModeContext";
import { appDefaults } from "./appDefaults";
import { appColors } from "./appColors";
import Header from "./components/Header";
import Head from "./components/Head";
import Line from "./components/Line";
import Date from "./components/Date";
import List from "./components/List";
import SubHead from "./components/SubHead";
import Paragraph from "./components/Paragraph";

const createEntry = (id, component, props = {}) => {
  const Component = component;
  return {
    id,
    jsx: <Component id={id} key={id} {...props} />,
  };
};

function App() {
  const [editMode, setEditMode] = useState(false);

  const [resumeEntries, setResumeEntries] = useState([]);

  const generateId = (entryCount) => `entry-${entryCount}`;

  const handleTogglingEditMode = () => {
    setEditMode((iem) => !iem);
  };

  const handleDeleteEntry = (id) => {
    setResumeEntries((entries) => entries.filter((e) => e.id !== id));
  };

  const addEntry = (component, props = {}) => {
    if (resumeEntries.length < Number.MAX_SAFE_INTEGER) {
      // Assert that entry id number > initial entries' count to avoid id conflicts
      const initialEntriesRendered =
        resumeEntries.length >= initialEntriesData.length;
      const id =
        resumeEntries.length +
        (initialEntriesRendered ? 1 : initialEntriesData.length);
      const entry = createEntry(generateId(id, component), component, {
        ...props,
        onDeleteEntry: handleDeleteEntry,
      });
      setResumeEntries((res) => [...res, entry]);
    } else {
      alert(
        "You exceeded tha max number of entries! Clear some entries to add others."
      );
    }
  };

  // Add initial resume's entries
  useEffect(() => {
    setResumeEntries(
      initialEntriesData.map((ire, i) => {
        const entryComponent = ire.component;
        const props = ire.props || {};
        const entryProps = {
          ...props,
          onDeleteEntry: handleDeleteEntry,
        };
        return createEntry(generateId(++i), entryComponent, entryProps);
      })
    );
  }, []);

  const controlButtons = [
    { text: "Add Line", handleClick: () => addEntry(Line) },
    { text: "Add Date", handleClick: () => addEntry(Date) },
    { text: "Add Headline", handleClick: () => addEntry(Head) },
    { text: "Add Paragraph", handleClick: () => addEntry(Paragraph) },
    { text: "Add Sub-Headline", handleClick: () => addEntry(SubHead) },
    { text: "Add Unordered List", handleClick: () => addEntry(List) },
    {
      text: "Add Ordered List",
      handleClick: () => addEntry(List, { ordered: true }),
    },
  ];

  return (
    <AppDefaultsContext.Provider value={appDefaults}>
      <AppColorsContext.Provider value={appColors}>
        <EditModeContext.Provider value={editMode}>
          <Header>
            <button
              type="button"
              style={{
                width: "6rem",
                height: "3rem",
                fontSize: "large",
                color: appColors.accent,
                backgroundColor: appColors.lightAccent,
              }}
              onClick={handleTogglingEditMode}
            >
              {editMode ? "Submit" : "Edit"}
            </button>
          </Header>
          <div
            style={{
              margin: "1rem auto",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {controlButtons.map((btn) => (
              <button
                type="button"
                key={btn.text}
                onClick={btn.handleClick}
                style={{
                  fontSize: "large",
                  border: "none",
                  boxShadow: "0 0 2px 0 #0007",
                  color: appColors.accent,
                  backgroundColor: appColors.lightAccent,
                }}
              >
                {btn.text}
              </button>
            ))}
          </div>
          <div style={{ padding: "1rem" }}>
            {resumeEntries.map((re) => re.jsx)}
          </div>
        </EditModeContext.Provider>
      </AppColorsContext.Provider>
    </AppDefaultsContext.Provider>
  );
}

export default App;
