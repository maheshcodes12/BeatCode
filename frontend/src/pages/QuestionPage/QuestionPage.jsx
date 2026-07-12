import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionById } from "../../services/practiceProblemsApi";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Question from "../../components/Question/Question.jsx";
import ProblemList from "../../components/ProblemList/ProblemList.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import CodeEditor from "../../components/CodeEditor/CodeEditor.jsx";
import ProblemSolutions from "../../components/ProblemSolutions/ProblemSolutions.jsx";
import QuestionSubmission from "../../components/SubmissionList/QuestionSubmission.jsx";
import { isLoggedIn } from "../../components/Login/isLoggedIn.js";
import { getUserStatus } from "../../services/getUserStats.js";
import FullScreenConfetti from "../../components/Confetti/FullScreenConfetti.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateToggleOutput } from "../../redux/slices/toggleOutput.js";
import OutputWindow from "../../components/OutputWindow/OutputWindow.jsx";

const tabs = [
	{ key: "question", label: "Question" },
	{ key: "solution", label: "Solution" },
	{ key: "submissions", label: "Submissions" },
	{ key: "problemlist", label: "Problem List" },
];

const QuestionPage = () => {
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const [question, setQuestion] = useState(null);
	const [navigation, setNavigation] = useState("question");
	const dispatch = useDispatch();
	const toggleOutput = useSelector((state) => state.toggleOutput?.value);
	const practiceStatus = useSelector((state) => state.practiceStatus?.value);
	const [response, setResponse] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const q = await fetchQuestionById(id);
				setQuestion(q);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};
		setNavigation("question");
		fetchData();
		if (isLoggedIn()) {
			const email = localStorage.getItem("email");
			async function handleStats() {
				const res = await getUserStatus(email);
				setResponse(res);
			}
			handleStats();
		}
	}, [id]);

	const handleToggleOutput = () => dispatch(updateToggleOutput(!toggleOutput));

	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			{loading ? (
				<div className="flex-1">
					<Loading />
				</div>
			) : (
				<div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-4 p-4 lg:flex-row">
					{practiceStatus && <FullScreenConfetti />}

					{/* Left pane */}
					<div className="flex h-[45vh] w-full flex-col rounded-xl border border-border bg-surface lg:h-[calc(100vh-140px)] lg:w-1/2">
						<div className="flex flex-wrap gap-1 border-b border-border px-4 pt-3">
							{tabs.map((tab) => (
								<button
									key={tab.key}
									className={`border-b-2 px-3 py-2 text-sm font-semibold transition-colors ${
										navigation === tab.key
											? "border-brand text-ink"
											: "border-transparent text-ink-muted hover:text-ink"
									}`}
									onClick={() => setNavigation(tab.key)}
								>
									{tab.label}
								</button>
							))}
						</div>
						<div className="flex-1 overflow-y-auto">
							{navigation === "question" && question && <Question question={question} />}
							{navigation === "solution" && question && <ProblemSolutions question={question} />}
							{navigation === "submissions" && question && <QuestionSubmission />}
							{navigation === "problemlist" && <ProblemList response={response} />}
						</div>
					</div>

					{/* Right pane */}
					<div className="flex h-[75vh] w-full flex-col rounded-xl border border-border bg-surface lg:h-[calc(100vh-140px)] lg:w-1/2">
						<div className="h-12 flex-shrink-0">
							<NavBar />
						</div>
						<div className={toggleOutput ? "h-[45%]" : "flex-1"}>
							{question && <CodeEditor question={question} />}
						</div>
						<button
							onClick={handleToggleOutput}
							className="flex h-10 w-full flex-shrink-0 items-center justify-between border-t border-border px-4 text-sm font-semibold text-ink"
						>
							Console
							<i className={`fa-solid fa-angle-${toggleOutput ? "down" : "up"}`}></i>
						</button>
						{toggleOutput && (
							<div className="h-[35%] flex-shrink-0 border-t border-border">
								<OutputWindow />
							</div>
						)}
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default QuestionPage;