/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				bg: "#FAFAFA",
				surface: "#FFFFFF",
				border: "#E3E5E8",
				ink: "#14161A",
				"ink-muted": "#5B6169",
				"ink-faint": "#8A8F97",
				brand: {
					DEFAULT: "#0E7C66",
					hover: "#0B6553",
					soft: "#E4F3EF",
				},
				easy: "#1CA672",
				medium: "#C98A1A",
				hard: "#D64545",
				code: {
					bg: "#0F1115",
					border: "#23262C",
					text: "#E6E8EB",
				},
			},
			fontFamily: {
				display: ["Sora", "sans-serif"],
				sans: ["Inter", "sans-serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
			keyframes: {
				blink: { "50%": { opacity: 0 } },
				reveal: {
					from: { opacity: 0, transform: "translateY(3px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
			},
			animation: {
				blink: "blink 1s step-end infinite",
				reveal: "reveal .4s ease forwards",
			},
		},
	},
	plugins: [],
};