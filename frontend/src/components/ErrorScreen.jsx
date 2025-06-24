import { useState } from "react";

const ErrorScreen = ({ error }) => {
	const couldNotAccessRedditMsg = "Oops we couldn't access Reddit!";
	const unexpectedResponse = "Unexpected Reddit response.";
	const noImagePostsMsg = "No image posts";
	const err403 = "This subreddit is private or restricted";
	const err404 = "That subreddit doesn't exist";
	const rateLimitMsg = "Too many requests. Try again in a few minutes.";
	const networkErrorMsg = "Network error. Please check your connection.";

	const renderErrorMessage = () => {
		if (error.includes("404")) return err404;
		if (error.includes("403")) return err403;
		if (error.includes("429")) return rateLimitMsg;
		if (error.includes("Network")) return networkErrorMsg;
		if (error.includes("Unexpected response")) return unexpectedResponse;
		if (error.includes("No image posts")) return noImagePostsMsg;

		// fall back message if none of the above were included with error
		return couldNotAccessRedditMsg;
	};

	return (
		// maybe render a try again button here to refetch
		<div
			className="flex flex-col  justify-center text-center p-4 h-[85vh] m-auto"
			role="alert"
			aria-live="assertive"
		>
			<h2 className="font-bold text-3xl mt-4">{renderErrorMessage()} </h2>

			{/* display the error itself */}
			<p className="font-bold text-red-500 text-xl my-4">{error}</p>

			<p className="text-xl my-4">Try searching for another subreddit</p>
		</div>
	);
};

export default ErrorScreen;
