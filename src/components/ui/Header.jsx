import React from 'react'

const Header = ({ title, subtitle, align = "left", variant = "h1" }) => {
    const alignment = {
        left: "text-left justify-between",
        center: "text-center flex-col gap-1 items-center justify-center",
        right: "text-left justify-between flex-row-reverse"
    }
    const tagStyles = {
        h1: "text-3xl font-bold text-gray-800 dark:text-white",
        h2: "text-2xl font-semibold text-gray-800 dark:text-white",
        h3: "text-xl font-medium text-gray-800 dark:white",
        h4: "text-lg font-medium text-gray-800 dark:white"
    };

    const TitleTag = variant;

    return (
        <div className={`flex ${alignment[align]} items-center mb-6 w-full `}>
            <div>
                <TitleTag className={tagStyles[variant]}>{title}</TitleTag>
                {subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

        </div>
    )
}

export default Header
