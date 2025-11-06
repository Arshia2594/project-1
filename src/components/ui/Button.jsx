import React from 'react'

const Button = ({
    children,
    variant="primary",
    className,
    ...props
}) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none"

    const variants = {
        primary: "bg-green-700 text-white hover:bg-green-800",
        secondary: "bg-green-100 text-green-700 hover:bg-green-200",
        outline: "border-2 border-green-700 text-green-700 hover:bg-green-50"
    }
  return (
    <button 
    className={`${baseStyles} ${variants[variant]} ${className}`}
    {...props}>
        {children}
    </button>
  )
}

export default Button
