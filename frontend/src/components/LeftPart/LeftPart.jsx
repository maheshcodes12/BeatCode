import React from "react";
import NavBar from "../NavBar/NavBar";
import CodeEditor from "../CodeEditor/CodeEditor";

const LeftPart = () => {
	return (
		<div className="flex h-[45vh] w-full flex-col rounded-xl border border-border bg-surface lg:h-[calc(100vh-140px)] lg:w-3/5">
			<div className="h-12 flex-shrink-0">
				<NavBar />
			</div>
			<div className="flex-1">
				<CodeEditor />
			</div>
		</div>
	);
};

export default LeftPart;