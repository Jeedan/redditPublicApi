import React from "react";

const Button = ({ onClick, disabled, children }) => {
	return (
		<button
			className="flex items-center justify-center flex-1 max-w-[80px] min-w-[40px] px-3 py-2 text-sm sm:min-w-[50px] sm:px-4 sm:py-3 sm:text-base h-12 bg-gray-800 text-white rounded disabled:opacity-50 dark:bg-slate-200 dark:text-neutral-900"
			// style={{ width: "100px", height: "50px" }}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
