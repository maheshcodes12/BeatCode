import React from "react";

const Footer = () => {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex max-w-[1380px] flex-col items-center gap-2 px-6 py-6 text-[17px] text-ink-faint sm:flex-row sm:justify-between">
				<span>
					© BeatCode — built by{" "}
					<a
						href="https://github.com/PalashChitnavis"
						target="_blank"
						rel="noreferrer"
						className="font-medium text-ink-muted hover:text-brand"
					>
						Palash Chitnavis
					</a>{" "}
					&{" "}
					<a
						href="https://github.com/maheshcodes12"
						target="_blank"
						rel="noreferrer"
						className="font-medium text-ink-muted hover:text-brand"
					>
						Mahesh Suryawanshi
					</a>
				</span>
				<a
					href={"https://github.com/PalashChitnavis/BeatCode"}
					target="_blank"
					rel="noreferrer"
					className="font-medium text-ink-muted hover:text-brand"
				>
					GitHub ↗
				</a>
			</div>
		</footer>
	);
};

export default Footer;