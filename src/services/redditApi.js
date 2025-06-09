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
const getRedditJson = async (subreddit = "airplaneears") => {
	try {
		// move this out to a utils file, maybe CONSTANTS
		// we use corsByPass because of getting throttled by reddit
		// move this to a express server later on to fetch from there
		const corsByPass = "https://corsproxy.io/?";
		const response = await axios.get(
			`${corsByPass}https://www.reddit.com/r/${subreddit}.json`,
			{
				headers: {
					"User-Agent": "MyRedditApp/0.1 by Jeedan",
				},
			}
		);
		const childrenData = response.data.data.children;
		// only show posts containing images
		const filterImages = childrenData.filter(
			(post) => post.data.post_hint === "image"
		);
		const redditData = filterImages.map((post) => ({
			id: post.data.id,
			author: post.data.author,
			imageUrl: post.data.url,
			title: post.data.title,
			permalink: `https://www.reddit.com${post.data.permalink}`,
		}));
		return redditData;
	} catch (error) {
		console.error(error);
	}
};

export { getRedditJson };
