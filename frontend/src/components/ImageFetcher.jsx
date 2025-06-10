import { useState, useEffect, useRef } from "react";
import UseRedditFetcher from "../hooks/useRedditFetcher";
import Spinner from "./Spinner";
import Button from "../Button";

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
				<Spinner height="600px" />
			) : error ? (
				// maybe render a try again button here to refetch
				<div className="text-center p-4">
					<p>Oops we couldn't access reddit! </p>
					<p className="text-red-500">{error}</p>
					<button
						className="w-24 h-12 bg-blue-500 text-white rounded mt-2 disabled:opacity-50"
						onClick={tryAgainHandler}
						disabled={loading}
					>
						Try again
					</button>
				</div>
			) : currentImage ? (
				<div
					className="flex flex-col items-center max-w-3xl w-full mx-auto p-4 border border-black"
					// style={{
					// 	boxSizing: "border-box",
					// }}
				>
					{/* the image component */}
					<div
						key={currentImage.id}
						className="w-full aspect-[4/3] mb-4 min-h-[700px]"
					>
						{/* show spinner when loading image */}
						{imgLoading && <Spinner height="600px" />}
						<img
							src={`${currentImage.imageUrl}`}
							alt={`${currentImage.title}`}
							onLoad={onLoadHandler}
							className={`w-full h-full object-contain transition-all duration-300 ease-in-out delay-75 ${
								imgLoading
									? "opacity-0 scale-95 blur-md"
									: "opacity-100 scale-100 blur-0"
							}`}
						/>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4 mb-4 w-full max-w-2xl">
						<Button
							onClick={prevImgHandler}
							disabled={currentIndex === 0}
						>
							Previous
						</Button>

						<div className="flex items-center justify-center flex-1 px-2 py-2 text-neutral-800 text-center text-lg whitespace-normal break-word">
							<small>
								Posted by:
								<a
									className="text-blue-900"
									href={`${currentImage.permalink}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									{" "}
									{currentImage.author}
								</a>
							</small>
						</div>
						<Button
							onClick={nextImgHandler}
							disabled={
								!hasMoreImages &&
								currentIndex === totalImages - 1
							}
						>
							Next
						</Button>
					</div>
				</div>
			) : (
				"No image available"
			)}
		</>
	);
};

export default ImageFetcher;
