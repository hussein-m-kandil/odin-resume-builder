import "./Button.css";

function Button({ children, className, appColors, onClick }) {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      onClick={onClick}
      style={{
        color: appColors.dark,
        backgroundColor: appColors.light,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
