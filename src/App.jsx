import { useEffect, useState } from "react";
import { initialEntriesData } from "./initialEntriesData";
import { AppDefaultsContext } from "./context/AppDefaultsContext";
import { AppColorsContext } from "./context/AppColorsContext";
import { EditModeContext } from "./context/EditModeContext";
import { appDefaults } from "./appDefaults";
import { appColors } from "./appColors";
import Header from "./components/Header";
// import Head from "./components/Head";
// import Line from "./components/Line";
// import Date from "./components/Date";
// import List from "./components/List";
// import SubHead from "./components/SubHead";
// import Paragraph from "./components/Paragraph";

const createEntry = (id, component, props = {}) => {
  const Component = component;
  return {
    id,
    jsx: <Component id={id} key={id} {...props} />,
  };
};

function App() {
  const [editMode, setEditMode] = useState(false);

  const handleTogglingEditMode = () => {
    setEditMode((iem) => !iem);
  };

  const [resumeEntries, setResumeEntries] = useState([]);

  const handleDeleteEntry = (id) => {
    setResumeEntries((entries) => entries.filter((e) => e.id !== id));
  };

  const generateId = (entryCount) => `entry-${entryCount}`;

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
          <div style={{ padding: "1rem" }}>
            {resumeEntries.map((re) => re.jsx)}
          </div>
        </EditModeContext.Provider>
      </AppColorsContext.Provider>
    </AppDefaultsContext.Provider>
  );
}

export default App;
