import React from "react";
import { useSelector } from "react-redux";

function OutputWindow() {
	const output = useSelector((state) => state.output?.value);

	return (
		<div className="flex h-full w-full flex-col gap-2 p-3">
			<p className="font-display text-lg font-semibold text-ink">Output</p>
			<textarea
				placeholder="Output will be displayed here"
				id="userOutput"
				className="h-full w-full resize-none rounded-lg border border-border bg-[#FBFBFB] p-3 font-mono text-md leading-relaxed text-ink outline-none focus:border-brand"
				readOnly
				value={output || ""}
			></textarea>
		</div>
	);
}

export default OutputWindow;