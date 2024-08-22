import { useContext } from "react";
import { AppColorsContext } from "../context/AppColorsContext";
import useWindowInnerWidth from "../hooks/useWindowInnerWidth";

const BREAK_POINT = 720;

function Header({ children }) {
  const appColors = useContext(AppColorsContext);

  const viewWidth = useWindowInnerWidth();

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
          padding: "0.5rem 1rem",
          margin: "0 auto",
          display: "flex",
          flex: "1",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: viewWidth < BREAK_POINT ? "center" : "space-between",
        }}
      >
        <h1
          style={{
            margin: "0",
            fontWeight: "bold",
            fontSize: "xx-large",
            color: appColors.light,
            textAlign: viewWidth < BREAK_POINT ? "center" : "left",
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
