const ErrorScreen = ({ error }) => {
	const COULD_NOT_ACCESS_REDDIT = "Oops we couldn't access Reddit!";
	const errorMessage = {
		SUBREDDIT_PRIVATE: "This subreddit is private or restricted.",
		SUBREDDIT_NOT_FOUND: "That subreddit doesn't exist.",
		SUBREDDIT_RATE_LIMIT: "Too many requests. Try again in a few minutes.",
		NETWORK_ERROR: "Network error. Please check your connection.",
		UNEXPECTED_RESPONSE: "Unexpected Reddit response",
		NO_IMAGE_POSTS: "We could not find any images",
	};

	const renderErrorMessage =
		error?.code && errorMessage[error.code]
			? errorMessage[error.code]
			: COULD_NOT_ACCESS_REDDIT;

	console.log("error.code:", error?.code);
	console.log("known codes:", Object.keys(errorMessage));

	return (
		// maybe render a try again button here to refetch
		<div
			className="flex flex-col  justify-center text-center p-4 h-[85vh] m-auto"
			role="alert"
			aria-live="assertive"
		>
			<h2 className="font-bold text-3xl mt-4">{renderErrorMessage} </h2>
			{/* display the error itself */}
			<p className="font-bold text-red-500 text-xl my-4">
				{error?.message}
			</p>
			<p className="text-xl my-4">Try searching for another subreddit</p>
		</div>
	);
};

export default ErrorScreen;
