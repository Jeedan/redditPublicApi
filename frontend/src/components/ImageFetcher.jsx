import { useState, useEffect, useRef } from "react";
import UseRedditFetcher from "../hooks/useRedditFetcher";
import Spinner from "./Spinner";
import Button from "./Button";
import ErrorScreen from "./ErrorScreen";

const ImageFetcher = ({ subreddit }) => {
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
		loading,
		error,
		fetchNextPage,
		hasMoreImages,
	} = UseRedditFetcher(subreddit);

	const [imgLoading, setImgLoading] = useState(true);
	// 2 states to track if we can advanced
	// to the next page after loading new images
	const [shouldAdvance, setShouldAdvance] = useState(false);
	const prevTotalImages = useRef(totalImages);

	const prevImgHandler = () => {
		if (loading) return;

		// go back if we are not at the start
		if (currentIndex > 0) setCurrentIndex((curIdx) => curIdx - 1);
		else setCurrentIndex(0);
	};

	const nextImgHandler = () => {
		if (loading) return;

		// go to next page
		if (currentIndex < totalImages - 1) {
			setCurrentIndex((curIdx) => curIdx + 1);
		} else if (hasMoreImages) {
			fetchNextPage();
			setShouldAdvance(true);
		}
	};

	// check to make sure we finished loading images
	// before advancing to the next page
	useEffect(() => {
		if (shouldAdvance && totalImages > prevTotalImages.current) {
			setCurrentIndex((curIdx) => curIdx + 1);
			setShouldAdvance(false);
		}
		prevTotalImages.current = totalImages;
	}, [totalImages, shouldAdvance]);

	// set up a useRef to cache images
	// and prevent needles reloading
	const loadedImages = useRef({});
	useEffect(() => {
		if (!currentImage) return;

		const img = new Image();
		img.src = currentImage.imageUrl;
		// show when it has loaded
		img.onload = () => {
			loadedImages.current[currentImage.id] = true;
			setImgLoading(false);
		};
		// set img state to loading
		setImgLoading(true);
	}, [currentImage]);

	const onLoadHandler = () => {
		if (!currentImage) return;
		loadedImages.current[currentImage.id] = true;
		setImgLoading(false);

		// simulate loading
		// setTimeout(() => {
		// 	loadedImages.current[currentImage.id] = true;
		// 	setImgLoading(false);
		// }, 1500);
	};

	// testing to see if we are loading
	//console.log("imgLoading state:", imgLoading);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[600px]">
				<Spinner />
			</div>
		);
	}

	if (error) {
		// maybe render a try again button here to refetch
		return <ErrorScreen error={error} />;
	}

	if (currentImage) {
		return (
			<div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto mt-2 md:mt-2 p-4 bg-neutral-100 rounded-md   drop-shadow-lg">
				{/* Title  */}
				<div className="flex justify-center  w-full space-y-2">
					<p className="text-neutral-800 font-semibold text-lg md:text-2xl">
						{currentImage.title}
					</p>
				</div>
				{/* Author */}
				<div className="w-full md:w-1/2 text-center text-nowrap">
					<small className="text-neutral-800 ">
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

				{/* Image and Buttons Row */}
				<div
					className="relative flex items-center justify-center w-full max-w-3xl aspect-[3/4] min-h-[600px] sm:min-h-[600px] md:min-h-[650px] max-h-[70vh] mx-auto overflow-hidden"
					aria-live="polite"
					aria-busy={imgLoading}
				>
					{/* Image */}
					<img
						src={currentImage.imageUrl}
						alt={currentImage.title || "Reddit image"}
						className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out delay-75 ${
							imgLoading
								? "hidden"
								: "opacity-100 scale-100 blur-0"
						}`}
					/>

					{/* Skeleton overlay while loading */}
					{imgLoading && (
						<div
							className="absolute inset-0 z-10 rounded-md
					bg-gray-300 animate-pulseImage"
						></div>
					)}

					{/* Previous Button */}
					<div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
						<Button
							onClick={prevImgHandler}
							disabled={currentIndex === 0}
							aria-label="Previous image"
						>
							{"<"}
						</Button>
					</div>

					{/* Next Button */}
					<div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
						<Button
							onClick={nextImgHandler}
							disabled={
								!hasMoreImages &&
								currentIndex === totalImages - 1
							}
							aria-label="Next image"
						>
							{">"}
						</Button>
					</div>
				</div>
				{/* Pagination or current image of total */}
				<div className="mt-2 text-neutral-900 dark:text-neutral-400">
					Post {currentIndex + 1} of {totalImages}
				</div>
			</div>
		);
	}

	// return no images found if all else fails
	return (
		<div className="flex justify-center items-center text-lg">
			<h2 className="text-2xl font-semibold text-gray-600">
				No images found
			</h2>
			<p className="text-sm text-muted-foreground">
				Try searching another subreddit.
			</p>
		</div>
	);
};

export default ImageFetcher;
