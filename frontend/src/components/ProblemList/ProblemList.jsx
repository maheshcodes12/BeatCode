import { React, useState, useEffect } from "react";
import { fetchAllQuestions } from "../../services/practiceProblemsApi";
import { Link } from "react-router-dom";
import capitalizeString from "../../services/capitaliseWord";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { updateOutput } from "../../redux/slices/outputSlice";
import { updateToggleOutput } from "../../redux/slices/toggleOutput";
import { updatePracticeStatus } from "../../redux/slices/practiceStatusSlice";
import questionsData from '../../data/questionsdata.json'

const pillClass = {
	easy: "bg-[#E6F6EF] text-easy",
	medium: "bg-[#FBF1E1] text-medium",
	hard: "bg-[#FBEAEA] text-hard",
};

const ProblemList = ({ response }) => {
	const output = useSelector((state) => state.output?.value);
	const dispatch = useDispatch();
	const [questions, setQuestions] = useState([]);
	const attemptedQuestions = response?.data?.attemptedQuestions || [];

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const questionsData = await fetchAllQuestions();
				setQuestions(questionsData);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};
		fetchData();
	}, [output]);

	const resetConfetti = () => {
		dispatch(updateOutput(""));
		dispatch(updatePracticeStatus(false));
		dispatch(updateToggleOutput(false));
	};

	return (
		<div className="h-full w-full overflow-y-auto rounded-xl border border-border bg-surface">
			{questions.length ? (
				<table className="w-full border-collapse text-left">
					<thead className="sticky top-0 bg-surface">
						<tr className="border-b border-border text-xs font-semibold uppercase tracking-wide text-ink-faint">
							<th className="w-[10%] p-3 text-center">Status</th>
							<th className="w-[65%] p-3">Problem</th>
							<th className="w-[25%] p-3">Difficulty</th>
						</tr>
					</thead>
					<tbody>
						{ questions.map((question) => (
							<tr key={question.id} className="border-b border-border text-sm transition-colors hover:bg-[#FBFBFB]">
								<td className="p-3 text-center">
									{attemptedQuestions.includes(question.id) ? (
										<span className="text-easy">✓</span>
									) : (
										<span className="inline-block h-3 w-3 rounded-sm border border-border" />
									)}
								</td>
								<td className="p-3">
									<Link
										onClick={resetConfetti}
										to={`/practiceproblems/questions/${question.id}`}
										className="font-medium text-ink hover:text-brand"
									>
										{question.title}
									</Link>
								</td>
								<td className="p-3">
									<span
										className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pillClass[question.diff] || pillClass.easy}`}
									>
										{capitalizeString(question.diff)}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default ProblemList;