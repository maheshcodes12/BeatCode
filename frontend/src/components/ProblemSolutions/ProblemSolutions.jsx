import { useEffect, useState } from "react";
import Solution from "../Solution/Solution.jsx";

const languages = [
	{ key: "c", label: "C" },
	{ key: "cpp", label: "C++" },
	{ key: "java", label: "Java" },
	{ key: "python", label: "Python" },
];

export default function ProblemSolutions({ question }) {
	const [navigation, setNavigation] = useState("c");

	return (
		<div className="flex h-full flex-col">
			<div className="flex gap-1 border-b border-border px-4 pt-3">
				{languages.map((lang) => (
					<button
						key={lang.key}
						className={`border-b-2 px-3 py-2 text-sm font-semibold transition-colors ${
							navigation === lang.key
								? "border-brand text-ink"
								: "border-transparent text-ink-muted hover:text-ink"
						}`}
						onClick={() => setNavigation(lang.key)}
					>
						{lang.label}
					</button>
				))}
			</div>
			<div className="flex-1 overflow-auto p-4">
				<Solution solution={question.solution[navigation]} language={navigation} />
			</div>
		</div>
	);
}