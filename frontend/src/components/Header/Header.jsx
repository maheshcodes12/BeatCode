import React from "react";
import { Link, useLocation } from "react-router-dom";
import Register from "../Login/Register";
import { isLoggedIn } from "../Login/isLoggedIn";
import Profile from "../Login/Profile";

const navLinks = [
	{ label: "Practice", to: "/practiceproblems" },
	{ label: "Compiler", to: "/onlinecompiler" },
	{ label: "Code Room", to: "/room" },
	{ label: "Leaderboard", to: "/leaderboard" },
];

const Header = () => {
	const location = useLocation();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-bg/85 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
				<Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-ink">
					<span className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-brand font-mono text-[15px] font-semibold text-white">
						&gt;_
					</span>
					BeatCode
				</Link>

				<nav className="hidden items-center gap-7 md:flex">
					{navLinks.map((link) => {
						const active = location.pathname.startsWith(link.to);
						return (
							<Link
								key={link.to}
								to={link.to}
								className={`border-b-2 pb-1 text-[14.5px] font-medium transition-colors ${
									active ? "border-brand text-ink" : "border-transparent text-ink-muted hover:text-ink"
								}`}
							>
								{link.label}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-3.5">{isLoggedIn() ? <Profile /> : <Register />}</div>
			</div>
		</header>
	);
};

export default Header;