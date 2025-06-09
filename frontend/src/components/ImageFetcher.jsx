import { useState, useEffect, useRef } from "react";
import UseRedditFetcher from "../hooks/useRedditFetcher";

const ImageFetcher = () => {
	//  id: post.data.id,
	// 	author: post.data.author,
	// 	imageUrl: post.data.url,
	// 	title: post.data.title,
	// 	permalink: `https://www.reddit.com${post.data.permalink}`
	const {
		currentImage,
		currentIndex,
		setCurrentIndex,
		totalImages,
		refetch,
		loading,
		error,
		fetchNextPage,
		subreddit,
		setSubreddit,
		hasMoreImages,
	} = UseRedditFetcher();

	const [imgLoading, setImgLoading] = useState(true);

	const prevImgHandler = (e) => {
		if (loading) return;

		if (currentIndex > 0) setCurrentIndex((curIdx) => curIdx - 1);
		else setCurrentIndex(0);
	};

	const nextImgHandler = (e) => {
		//console.log(totalImages);
		if (loading) return;

		// fetch next page if we are at the end
		if (currentIndex === totalImages - 1 && hasMoreImages) {
			fetchNextPage();
			setCurrentIndex((curIdx) => curIdx + 1);
		}

		if (currentIndex < totalImages - 1)
			setCurrentIndex((curIdx) => curIdx + 1);
	};

	const loadMoreHandler = (e) => {
		console.log("more images: ", totalImages);
		fetchNextPage();
	};

	const tryAgainHandler = (e) => {
		console.log("refetching data...");
		refetch();
	};

	const loadedImages = useRef({});
	useEffect(() => {
		if (!currentImage) return;

		if (loadedImages.current[currentImage.id]) {
			setImgLoading(false);
		} else {
			setImgLoading(true);
		}
	}, [currentImage]);

	const onLoadHandler = () => {
		if (!currentImage) return;
		loadedImages.current[currentImage.id] = true;
		setImgLoading(false);
	};
	// testing to see if we are loading
	//console.log("imgLoading state:", imgLoading);
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
							onClick={loadMoreHandler}
							disabled={!hasMoreImages}
						>
							LOAD AFTER
						</button>
						<button
							style={{ width: "100px" }}
							onClick={nextImgHandler}
							disabled={
								!hasMoreImages &&
								currentIndex === totalImages - 1
							}
						>
							Next
						</button>
					</div>

					<div key={currentImage.id}>
						{imgLoading && <div>Loading image...</div>}

						<img
							src={`${currentImage.imageUrl}`}
							alt={`${currentImage.title}`}
							onLoad={onLoadHandler}
							style={{
								filter: imgLoading ? "blur(10px)" : "none",
								transition: "filter 0.3s ease",
								width: "100%",
								height: "auto", // Scale height proportionally
								maxHeight: "800px", // Don't get too tall
								objectFit: "contain", // Preserve aspect ratio, no cropping
							}}
						/>
					</div>
				</div>
			) : (
				"No image available"
			)}
		</>
	);
};

export default ImageFetcher;
