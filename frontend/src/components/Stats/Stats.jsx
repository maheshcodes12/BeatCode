/* eslint-disable react/prop-types */
import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { isLoggedIn } from "../Login/isLoggedIn";

const rows = [
	{ key: "easy", label: "Easy", textClass: "text-easy", barClass: "bg-easy" },
	{ key: "medium", label: "Medium", textClass: "text-medium", barClass: "bg-medium" },
	{ key: "hard", label: "Hard", textClass: "text-hard", barClass: "bg-hard" },
];

export default function Stats({ response }) {
	const problemsSolved = {
		easy: response?.data?.attempts?.easy || 0,
		medium: response?.data?.attempts?.medium || 0,
		hard: response?.data?.attempts?.hard || 0,
	};
	const totalProblems = { easy: 2, medium: 2, hard: 1 };

	return (
		<div className="flex h-full w-full flex-col gap-4 rounded-xl border border-border bg-surface p-5">
			<h2 className="font-display text-lg font-bold text-ink">Your progress</h2>

			{!isLoggedIn() && (
				<div className="rounded-lg border border-border bg-[#FBFBFB] px-3 py-2.5 text-lg text-ink-muted">
					Log in to track your progress.
				</div>
			)}

			<div className="flex flex-col">
				{rows.map((row) => (
					<div key={row.key}>
						<div className="flex items-center justify-between text-md font-semibold">
							<span className={row.textClass}>{row.label}</span>
							<span className="text-ink-faint">
								{problemsSolved[row.key]}/{totalProblems[row.key]}
							</span>
						</div>
						<ProgressBar
							progress={problemsSolved[row.key] / totalProblems[row.key]}
							colorClass={row.barClass}
						/>
					</div>
				))}
			</div>
		</div>
	);
}