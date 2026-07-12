import React, { useEffect, useState } from "react";
import { onlineCompilerSubmissions, practiceProblemsSubmissions } from "../../services/submissionsApi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const SubmissionList = () => {
	const [toggleSubmission, setToggleSubmission] = useState("practiceproblems");
	const email = localStorage.getItem("email");
	const [compilersubmissions, setCompilerSubmissions] = useState(null);
	const [practicesubmissions, setPracticeSubmissions] = useState(null);

	function handleToggle(name) {
		setToggleSubmission(name);
		if (name === "practiceproblems") {
			practiceProblemsSubmissions(email).then((res) => setPracticeSubmissions([...res].reverse()));
		}
		if (name === "onlinecompiler") {
			onlineCompilerSubmissions(email).then((res) => setCompilerSubmissions([...res].reverse()));
		}
	}

	const formatDateTime = (dateTime) => {
		const date = new Date(dateTime);
		const dateString = date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
		const timeString = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true });
		return `${dateString} at ${timeString}`;
	};

	useEffect(() => {
		practiceProblemsSubmissions(email).then((res) => setPracticeSubmissions([...res].reverse()));
		onlineCompilerSubmissions(email).then((res) => setCompilerSubmissions([...res].reverse()));
	}, []);

	const tabClass = (active) =>
		`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
			active ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
		}`;

	const EmptyState = () => (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2 py-16 text-ink-faint">
			<i className="fa-solid fa-heart-crack text-2xl text-hard"></i>
			<span>No submissions made yet</span>
		</div>
	);

	return (
		<div className="mx-auto w-full max-w-[900px] p-4">
			<div className="mb-5 flex rounded-lg border border-border bg-[#FBFBFB] p-1">
				<button className={tabClass(toggleSubmission === "practiceproblems")} onClick={() => handleToggle("practiceproblems")}>
					Practice Problems
				</button>
				<button className={tabClass(toggleSubmission === "onlinecompiler")} onClick={() => handleToggle("onlinecompiler")}>
					Compiler & Code Room
				</button>
			</div>

			{toggleSubmission === "practiceproblems" ? (
				<div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
					{practicesubmissions && practicesubmissions.length > 0 ? (
						practicesubmissions.map((submission) => {
							const i = submission.output?.indexOf("Test case 1");
							const trimmed_result = submission.output?.substring(i);
							return (
								<div key={submission._id} className="rounded-lg border border-border p-4">
									<div className="mb-3 text-sm font-semibold text-ink">
										{formatDateTime(submission.createdAt)}
									</div>
									<div className="overflow-hidden rounded-lg border border-border">
										<SyntaxHighlighter language={submission.language} style={oneLight} wrapLongLines customStyle={{ margin: 0, fontSize: 13 }}>
											{submission.code}
										</SyntaxHighlighter>
									</div>
									<div className="mt-3 rounded-lg border border-border bg-[#FBFBFB] p-3 font-mono text-xs">
										<div>
											<span className="font-semibold text-ink">Status: </span>
											<span className={submission.status === "Passed" ? "text-easy" : "text-hard"}>
												{submission.status}
											</span>
										</div>
										<div className="mt-1 whitespace-pre-wrap text-ink-muted">{trimmed_result}</div>
									</div>
								</div>
							);
						})
					) : (
						<EmptyState />
					)}
				</div>
			) : (
				<div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
					{compilersubmissions && compilersubmissions.length > 0 ? (
						compilersubmissions.map((submission) => (
							<div key={submission._id} className="rounded-lg border border-border p-4">
								<div className="mb-3 text-sm font-semibold text-ink">{formatDateTime(submission.createdAt)}</div>
								<div className="overflow-hidden rounded-lg border border-border">
									<SyntaxHighlighter language={submission.language} style={oneLight} wrapLongLines customStyle={{ margin: 0, fontSize: 13 }}>
										{submission.code}
									</SyntaxHighlighter>
								</div>
								<div className="mt-3 rounded-lg border border-border bg-[#FBFBFB] p-3 font-mono text-xs">
									<div>
										<span className="font-semibold text-ink">Input: </span>
										<span className="text-ink-muted">{submission.input}</span>
									</div>
									<div className="mt-1">
										<span className="font-semibold text-ink">Output: </span>
										<span className="text-ink-muted">{submission.output}</span>
									</div>
								</div>
							</div>
						))
					) : (
						<EmptyState />
					)}
				</div>
			)}
		</div>
	);
};

export default SubmissionList;