const Card = ({
  title,
  subtitle,
  children,
  footer,
  shadow = "md",
  rounded = "lg",
  className = "",
}) => {
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };

  return (
    <div
      className={`bg-white border border-gray-200 p-4 ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${className}`}
    >
      {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-500 mb-2">{subtitle}</p>}

      <div className="mt-2">{children}</div>

      {footer && <div className="mt-4 border-t pt-2">{footer}</div>}
    </div>
  );
};

export default Card;
