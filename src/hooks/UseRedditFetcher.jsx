import { useEffect, useState } from "react";
import { getRedditJson } from "../services/redditApi";

const UseRedditFetcher = () => {
	const [images, setImages] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [refetchTrigger, setRefetchTrigger] = useState(0);

	const refetch = async () => {
		// just an arbitrary method to trigger a refetch
		setCurrentIndex(0);
		setRefetchTrigger((i) => i + 1);
	};

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(""); // clear previous errors
			const data = await getRedditJson();
			setImages(data);
			setLoading(false);
			console.log("useRedditFetcher: ", data);
		} catch (error) {
			console.error("Reddit fetch error:", error);
			setError(
				typeof error === "string"
					? error
					: error?.message || "An error occured"
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [refetchTrigger]);

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
	};
};

export default UseRedditFetcher;
