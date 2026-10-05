function Button({
  children,
  type = "button",
  onClick,
  className = "place-order-btn"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}

export default Button;