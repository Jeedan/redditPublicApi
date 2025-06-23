import React from "react";

const ErrorScreen = ({ error }) => {
	return (
		// maybe render a try again button here to refetch
		<div
			className="flex flex-col  justify-center text-center p-4 h-[85vh] m-auto"
			role="alert"
			aria-live="assertive"
		>
			<h2 className="font-bold text-3xl mt-4">
				Oops we couldn't access Reddit!{" "}
			</h2>
			<p className="text-red-500 text-xl my-4">{error}</p>
			<p className="text-xl my-4">Try searching for another subreddit</p>
		</div>
	);
};

export default ErrorScreen;
