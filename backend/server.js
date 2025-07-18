import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(cors());
app.get("/", (req, res) => {
	res.send("Proxy for Reddit App... api is at /api/reddit");
});

app.get("/api/reddit", async (req, res) => {
	const { subreddit = "airplaneears", after = "", limit = 25 } = req.query;
	const timeStamp = `t=${Date.now()}`;
	try {
		const response = await axios.get(
			`https://www.reddit.com/r/${subreddit}.json?after=${after}&limit=${limit}&${timeStamp}`,
			{
				headers: {
					"User-Agent": "MyRedditApp/0.1 by Jeedan",
				},
			}
		);

		res.status(response.status).json(response.data);
	} catch (err) {
		res.status(err.response?.status || 500).json({
			error: err?.response?.status,
			message:
				err?.response?.data?.message || err.message || "Unknown error",
		});
	}
});

app.listen(PORT, () => {
	console.log(`Proxy server running on http://localhost:${PORT}`);
});
