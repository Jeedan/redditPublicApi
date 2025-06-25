import { useEffect, useState } from "react";
import { getRedditJson } from "../services/redditApi";

const UseRedditFetcher = (subreddit) => {
	// const [subreddit, setSubreddit] = useState("airplaneears");
	const [images, setImages] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [refetchTrigger, setRefetchTrigger] = useState(0);

	const [afterToken, setAfterToken] = useState("");
	const [hasMoreImages, setHasMoreImages] = useState(false);

	const refetch = async () => {
		// just an arbitrary method to trigger a refetch
		setCurrentIndex(0);
		setRefetchTrigger((i) => i + 1);
	};

	const fetchData = async (after = "") => {
		try {
			setLoading(true);
			// check if we have an after token
			setError(null); // clear previous errors
			const { images: newImages, afterToken: newAfterToken } =
				await getRedditJson(subreddit, after);

			// append images if we have a token else just set the images
			if (after) {
				setImages((prev) => [...prev, ...newImages]);
			} else {
				setImages(newImages);
			}

			setAfterToken(newAfterToken);
			setHasMoreImages(!!newAfterToken);
		} catch (err) {
			console.error("Reddit fetch error:", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const fetchNextPage = async () => {
		if (!afterToken) return;
		fetchData(afterToken);
	};

	// // call fetch again when we trigger the refetch
	useEffect(() => {
		if (images.length <= 0) return;
		console.log("fetch images: ", images);
	}, [images]);

	// reset everything when a subreddit changes
	useEffect(() => {
		setCurrentIndex(0);
		setImages([]);
		setAfterToken("");
		fetchData();
	}, [subreddit, refetchTrigger]);

	//  id: post.data.id,
	// 	author: post.data.author,
	// 	imageUrl: post.data.url,
	// 	title: post.data.title,
	// 	permalink: `https://www.reddit.com${post.data.permalink}`
	return {
		currentImage: images[currentIndex],
		currentIndex,
		setCurrentIndex,
		totalImages: images.length,
		refetch,
		loading,
		error,
		fetchNextPage,
		// subreddit,
		// setSubreddit,
		hasMoreImages,
	};
};

export default UseRedditFetcher;
