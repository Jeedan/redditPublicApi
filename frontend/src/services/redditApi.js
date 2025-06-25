import axios from "axios";
// filter posts not containing images
// look for
// permalink: the url of the post 'r/${subreddit}'
// author
// title
// post_hint: 'image'
// url:
// thumbnail
// domain (like i.redd.it)
// preview: images (array): id, resolution(array, 6 values):
// score (upvote count?)
// subreddit type (public)
// after='' is used to load more pages
// &limit=25 this is used to limit the amount of posts.. hard coded for now
const getRedditJson = async (
	subreddit = "airplaneears",
	afterToken = "",
	limit = 25
) => {
	try {
		// move this out to a utils file, maybe CONSTANTS
		// we use corsByPass because of getting throttled by reddit
		// move this to a express server later on to fetch from there
		const apiURL = "/api/reddit/";
		//"http://localhost:5000/api/reddit?subreddit=airplaneears"
		// .json?after=${afterToken}&limit=${limit}
		const url = `${apiURL}?subreddit=${subreddit}&after=${afterToken}&limit=${limit}`;
		const response = await axios.get(url);

		// check if our response is of type Array
		if (
			!response.data ||
			!response.data.data ||
			!Array.isArray(response.data.data.children)
		) {
			throw new Error("Unexpected response structure from Reddit");
		}

		console.log("response.data json: ", response.data);
		const after = response.data.data.after;
		console.log("after: ", after);
		//rich:video
		const childrenData = response.data.data.children;
		// only show posts containing images
		const filterImages = childrenData.filter(
			(post) => post.data.post_hint === "image"
		);

		// if we don't have images treat it as an empty array
		if (filterImages.length === 0) {
			throw new Error(`No Image posts found in r/${subreddit}`);
		}

		// expand on this data if we need more fields in the future
		const redditData = filterImages.map((post) => ({
			id: post.data.id,
			author: post.data.author,
			imageUrl: post.data.url,
			title: post.data.title,
			permalink: `https://www.reddit.com${post.data.permalink}`,
		}));
		return { images: redditData, afterToken: after };
	} catch (err) {
		// forbidden
		if (err.response?.status === 403) throw new Error("403");
		// not found
		if (err.response?.status === 404) throw new Error("404");
		// rate limit
		if (err.response?.status === 429) throw new Error("429");

		if (err.name === "TypeError") {
			throw new Error("Network error");
		}
		throw new Error(err.message);
	}
};

export { getRedditJson };
