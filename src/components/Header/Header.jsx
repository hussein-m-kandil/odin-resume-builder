import "./Header.css";

function Header({ children, appColors }) {
  return (
    <div className="header" style={{ backgroundColor: appColors.accent }}>
      <div className="header-content">
        <h1 className="header-title" style={{ color: appColors.light }}>
          Odin Résumé Builder
        </h1>
        {children}
      </div>
    </div>
  );
}

export default Header;
