import { useEffect, useState } from "react";

const Header = ({ subreddit, setSubreddit }) => {
	const [inputValue, setInputValue] = useState("");
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	// Update window width for responsive placeholder
	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const placeholder =
		windowWidth < 648 ? "Search subreddit" : "Search for any subreddit...";

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmedInputValue = inputValue.trim();
		if (trimmedInputValue === subreddit) {
			setInputValue("");
			return;
		}
		if (trimmedInputValue !== "") {
			setSubreddit(trimmedInputValue);
			setInputValue("");
		}
	};

	return (
		<nav className="border-b bg-neutral-100 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 shadow-sm">
			<div className=" flex h-14 md:h-16 items-center justify-between px-4">
				{/* Left: Logo */}
				<div className="flex items-center whitespace-nowrap">
					<p className="font-extrabold text-lg md:text-3xl tracking-tight dark:text-white text-gray-900">
						Fetch Reddit Images
					</p>
				</div>

				{/* Center: Search bar */}
				<div className="flex-grow max-w-md mx-4 min-w-52 sm:min-w-72">
					<form className="relative w-full" onSubmit={handleSubmit}>
						<input
							type="search"
							placeholder={placeholder}
							className="pl-2 md:pl-4 h-8 w-full shadow-sm rounded focus:outline-none"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<button
							type="submit"
							className="absolute right-1 top-1/2 -translate-y-1/2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
						>
							Search
						</button>
					</form>
				</div>

				{/* Right: Invisible clone of logo for balance */}
				<div className="flex items-center invisible whitespace-nowrap border border-red-600">
					<p className="font-extrabold text-lg md:text-3xl tracking-tight text-gray-900">
						Fetch Reddit Images
					</p>
				</div>
			</div>
		</nav>
	);
};

export default Header;
