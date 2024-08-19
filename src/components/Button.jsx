function Button({ children, style, onClick }) {
  return (
    <button type="button" style={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
