const Header = () => {
	return (
		<nav className="border-b bg-neutral-100 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/60 shadow-sm">
			<div className="container flex h-14 md:h-16 items-center">
				{/* the logo */}
				<div className="flex items-center space-x-2">
					{/* Camera icon from Shadcn ui */}
					{/*<Camera className="h-6 w-6" /> */}

					<p className="pl-4 font-extrabold text-lg md:text-3xl tracking-tight dark:text-white text-gray-900">
						Fetch Reddit Images
					</p>
				</div>

				{/* Centered Search */}
				<div className="flex-1 flex justify-center px-8">
					<div className="relative w-full max-w-md">
						{/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
						<input
							type="search"
							placeholder="Search images..."
							className="pl-2 md:pl-4 h-8 w-full shadow-sm rounded focus:outline-none"
							// value={searchQuery}
							// onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				{/* Right side spacer to balance the logo */}
				{/* <div className="w-[140px]" /> */}
			</div>
		</nav>
	);
};

export default Header;
