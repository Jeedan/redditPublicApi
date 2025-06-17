import React from "react";

const Button = ({ onClick, disabled, children }) => {
	return (
		<button
			className="flex items-center justify-center text-center p4 w-12 h-12 max-w-20 max-h-20 min-w-10 min-h-10 text-sm  sm:text-base font-bold whitespace-nowrap bg-white bg-opacity-70 lg:bg-opacity-100 sm:bg-gray-800 text-neutral-900 sm:text-white rounded-full dark:bg-slate-200 dark:text-neutral-900 disabled:opacity-50 hover:shadow-md transition-all duration-150"
			// style={{ width: "100px", height: "50px" }}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
