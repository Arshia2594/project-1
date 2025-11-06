import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  size = "md", // sm | md | lg
  leftIcon: LeftIcon, 
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const isPassword = type === "password";
  const finalType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col w-full mb-3">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon
            className="absolute left-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
        )}

        <input
          type={finalType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-700 transition w-full ${sizes[size]} ${LeftIcon ? "pl-9" : ""} ${isPassword ? "pr-9" : ""} ${disabled ? "bg-gray-200 cursor-not-allowed" : ""} ${className}`}
          {...props}
        />

        {isPassword && (
          <span
            className="absolute right-3 text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}

          </span>
        )}
      </div>

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
