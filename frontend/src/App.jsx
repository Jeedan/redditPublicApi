import { useState } from "react";
import "./App.css";
import ImageFetcher from "./components/ImageFetcher";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	const [subreddit, setSubreddit] = useState("airplaneears");
	return (
		<>
			<Header subreddit={subreddit} setSubreddit={setSubreddit} />
			<ImageFetcher subreddit={subreddit} />
			<Footer />
		</>
	);
}

export default App;
