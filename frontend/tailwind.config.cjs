/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				pulseImage: {
					"0%, 100%": { opacity: "0.5", transform: "scale(1)" },
					"50%": { opacity: "1", transform: "scale(1.02)" },
				},
			},
			animation: {
				pulseImage: "pulseImage 1.6s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
