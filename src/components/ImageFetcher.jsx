import UseRedditFetcher from "../hooks/useRedditFetcher";

const ImageFetcher = () => {
	const {
		currentImage,
		currentIndex,
		setCurrentIndex,
		totalImages,
		refetch,
		loading,
		error,
	} = UseRedditFetcher();

	const prevImgHandler = (e) => {
		if (currentIndex > 0) setCurrentIndex((curIdx) => curIdx - 1);
		else setCurrentIndex(0);
	};

	const nextImgHandler = (e) => {
		//console.log(totalImages);
		if (currentIndex < totalImages - 1)
			setCurrentIndex((curIdx) => curIdx + 1);
	};

	const tryAgainHandler = (e) => {
		console.log("refetching data...");
		refetch();
	};

	return (
		<>
			{loading ? (
				// show a spinner here
				"fetching data..."
			) : error ? (
				// maybe render a try again button here to refetch
				<div>
					<p>Oops we couldn't access reddit! </p>
					<p style={{ color: "red" }}>{error} </p>
					<button
						style={{ width: "100px" }}
						onClick={tryAgainHandler}
						disabled={loading}
					>
						Try again
					</button>
				</div>
			) : currentImage ? (
				//  id: post.data.id,
				// 	author: post.data.author,
				// 	imageUrl: post.data.url,
				// 	title: post.data.title,
				// 	permalink: `https://www.reddit.com${post.data.permalink}`
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "800px",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							width: "80%",
							justifyContent: "space-between",
							marginBottom: "1rem",
						}}
					>
						<button
							style={{ width: "100px" }}
							disabled={currentIndex === 0}
							onClick={prevImgHandler}
						>
							Previous
						</button>
						<button
							style={{ width: "100px" }}
							onClick={nextImgHandler}
							disabled={currentIndex === totalImages - 1}
						>
							Next
						</button>
					</div>

					<img
						style={{
							width: "100%",
							height: "auto", // Scale height proportionally
							maxHeight: "800px", // Don't get too tall
							objectFit: "contain", // Preserve aspect ratio, no cropping
						}}
						src={`${currentImage.imageUrl}`}
						alt={`${currentImage.title}`}
					/>
				</div>
			) : (
				"No image available"
			)}
		</>
	);
};

export default ImageFetcher;
