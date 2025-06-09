import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageFetcher from "./components/ImageFetcher";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			{/* <div>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div> */}
			<h1>Fetch Reddit Images</h1>
			<div className="card">
				<ImageFetcher />
			</div>
		</>
	);
}

export default App;
