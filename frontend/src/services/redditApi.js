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
			//const corsByPass = "https://api.allorigins.win/raw?url=";
			//const corsByPass = "https://corsproxy.io/?";
			//"https://corsproxy.io/?";
			//"https://www.reddit.com/r/"
			//const cacheBuster = `&t=${Date.now()}`;  add a timestamp for our api call because reddit caches free api calls so we might get unreliable json back or none.

			const apiURL = "/api/reddit/";
			//"http://localhost:5000/api/reddit?subreddit=airplaneears"
			// .json?after=${afterToken}&limit=${limit}
			const url = `${apiURL}?subreddit=${subreddit}&after=${afterToken}&limit=${limit}`;
			const response = await axios.get(url);

			console.log(response.data.data);
			const after = response.data.data.after;
			console.log("after: ", after);

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
			return { images: redditData, afterToken: after };
		} catch (error) {
			console.error("Failed to fetch Reddit posts... ", error);
			return { images: [], afterToken: "" };
		}
	};

	export { getRedditJson };
