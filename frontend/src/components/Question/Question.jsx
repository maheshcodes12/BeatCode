import React from "react";
import capitalizeString from "../../services/capitaliseWord";

const pillClass = {
	easy: "bg-[#E6F6EF] text-easy",
	medium: "bg-[#FBF1E1] text-medium",
	hard: "bg-[#FBEAEA] text-hard",
};

const Question = ({ question }) => {
	const { title, diff, description, example_cases } = question;
	return (
		<div className="flex flex-col gap-4 p-5">
			<div>
				<h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
				<span
					className={`mt-2 inline-block rounded-full px-2.5 py-1 text-sm font-semibold ${pillClass[diff] || pillClass.easy}`}
				>
					{/* {capitalizeString(diff)} */} diff
				</span>
			</div>
			<p className="text-[15px] leading-relaxed text-ink-muted">{description}</p>
			<div className="flex flex-col gap-4">
				{example_cases.map((example, index) => (
					<div key={index} className="rounded-lg border border-border bg-[#FBFBFB] p-4">
						<p className="mb-2 text-md font-semibold text-ink">Example {index + 1}</p>
						<div className="flex flex-col gap-1.5 font-mono text-md">
							<div>
								<span className="text-brand">Input:</span>{" "}
								<span className="text-ink-muted">{example.input}</span>
							</div>
							<div>
								<span className="text-brand">Output:</span>{" "}
								<span className="text-ink-muted">{example.output}</span>
							</div>
							{example.explanation && (
								<div className="pt-1 font-sans text-[15px] text-ink-faint">
									Explanation: {example.explanation}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Question;