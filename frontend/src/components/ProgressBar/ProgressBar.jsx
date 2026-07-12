/* eslint-disable react/prop-types */
import React from "react";

export default function ProgressBar({ progress, colorClass }) {
	return (
		<div className="mb-5 mt-2 h-1.5 w-full rounded-full bg-[#EDEEF0]">
			<div
				className={`h-1.5 rounded-full transition-all ${colorClass}`}
				style={{ width: `${Math.min(progress * 100, 100)}%` }}
			></div>
		</div>
	);
}