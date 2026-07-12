import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import capitalizeString from "../../services/capitaliseWord";
import { useParams } from "react-router-dom";
import { getSubmissions } from "../../services/getSubmissionsApi";

const QuestionSubmission = () => {
	const { id } = useParams();
	const [submissions, setSubmissions] = useState([]);

	useEffect(() => {
		const handleSubmissions = async () => {
			const sub = await getSubmissions(id);
			setSubmissions(sub);
		};
		handleSubmissions();
	}, [id]);

	const formatDateTime = (dateTime) => {
		const date = new Date(dateTime);
		const dateString = date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
		const timeString = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true });
		return `${dateString} at ${timeString}`;
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			{submissions?.length ? (
				submissions.map((submission) => (
					<div key={submission._id} className="rounded-lg border border-border p-4">
						<div className="mb-3 flex flex-wrap items-center gap-3">
							<img
								className="h-7 w-7 rounded-full"
								src={`https://ui-avatars.com/api/?name=${submission.user_email?.charAt(0)}&background=random`}
								alt="userProfile"
							/>
							<span className="text-sm font-semibold text-ink">{submission.user_name}</span>
							<span className="text-xs text-ink-faint">· {formatDateTime(submission.createdAt)}</span>
							<span className="text-xs text-ink-faint">
								· {capitalizeString(submission.language === "cpp" ? "C++" : submission.language)}
							</span>
						</div>
						<div className="overflow-hidden rounded-lg border border-border">
							<SyntaxHighlighter
								language={submission.language}
								style={oneLight}
								wrapLongLines
								customStyle={{ margin: 0, fontSize: 13 }}
							>
								{submission.code}
							</SyntaxHighlighter>
						</div>
					</div>
				))
			) : (
				<div className="flex justify-center py-8 text-sm text-ink-faint">No submissions yet, be the first one 😊</div>
			)}
		</div>
	);
};

export default QuestionSubmission;