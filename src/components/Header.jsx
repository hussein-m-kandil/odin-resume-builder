import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";

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

export default Header;
