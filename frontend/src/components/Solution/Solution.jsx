import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Solution = ({ solution, language }) => {
	return (
		<div className="overflow-hidden rounded-lg border border-border">
			<SyntaxHighlighter
				language={language}
				style={oneLight}
				wrapLongLines={true}
				customStyle={{ margin: 0, fontSize: 16 }}
			>
				{solution}
			</SyntaxHighlighter>
		</div>
	);
};

export default Solution;