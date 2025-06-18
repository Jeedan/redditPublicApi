import { useState, useEffect, useRef } from "react";
import UseRedditFetcher from "../hooks/useRedditFetcher";
import Spinner from "./Spinner";
import Button from "./Button";

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
				<div className="flex justify-center items-center min-h-[600px]">
					<Spinner />
				</div>
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
				<div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-4">
					{/* Image and Buttons Row */}
					<div className="relative w-full max-w-3xl h-auto max-h-[80vh] aspect-[3/4] flex items-center justify-center">
						{/* Previous Button */}
						<div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
							<Button
								onClick={prevImgHandler}
								disabled={currentIndex === 0}
							>
								{"<"}
							</Button>
						</div>

						{/* Image */}
						<img
							src={currentImage.imageUrl}
							alt={currentImage.title}
							onLoad={onLoadHandler}
							className={`h-[70vh] max-h-[70vh] w-auto max-w-full object-contain transition-all duration-300 ease-in-out delay-75 ${
								imgLoading
									? "opacity-0 scale-95 blur-md"
									: "opacity-100 scale-100 blur-0"
							}`}
						/>

						{/* Spinner overlay while loading */}
						{imgLoading && (
							<div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-10">
								<Spinner />
							</div>
						)}

						{/* Next Button */}
						<div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
							<Button
								onClick={nextImgHandler}
								disabled={
									!hasMoreImages &&
									currentIndex === totalImages - 1
								}
							>
								{">"}
							</Button>
						</div>
					</div>

					{/* Author */}
					<small className="text-neutral-800 text-center">
						Posted by:
						<a
							className="text-blue-900"
							href={currentImage.permalink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{" "}
							{currentImage.author}
						</a>
					</small>
				</div>
			) : (
				"No image available"
			)}
		</>
	);
};

export default ImageFetcher;
