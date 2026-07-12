import React from "react";
import OutputWindow from "../OutputWindow/OutputWindow";
import InputWindow from "../InputWindow/InputWindow";

const RightPart = () => {
	return (
		<div className="flex h-[55vh] w-full flex-col gap-4 lg:h-[calc(100vh-140px)] lg:w-2/5">
			<div className="h-1/2 w-full rounded-xl border border-border bg-surface">
				<InputWindow />
			</div>
			<div className="h-1/2 w-full rounded-xl border border-border bg-surface">
				<OutputWindow />
			</div>
		</div>
	);
};

export default RightPart;