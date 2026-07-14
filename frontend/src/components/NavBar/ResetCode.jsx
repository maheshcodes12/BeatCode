import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchQuestionById } from "../../services/practiceProblemsApi";
import { getBoilerplateCode } from "../../services/getBoilerPlateCode";
import { useSelector, useDispatch } from "react-redux";
import { updateCode } from "../../redux/slices/codeSlice";
import { updateUserInput } from "../../redux/slices/userInputSlice";
import { updateOutput } from "../../redux/slices/outputSlice";
import { updateToggleOutput } from "../../redux/slices/toggleOutput";

const ResetCode = () => {
	const language = useSelector((state) => state.language?.value);
	const dispatch = useDispatch();
	const location = useLocation();
	const { id } = useParams();
	const [question, setQuestion] = useState(null);

	const handleResetClick = async () => {
		const code = getBoilerplateCode(location, language, question);
		dispatch(updateCode(code));
		dispatch(updateOutput(""));
		dispatch(updateUserInput(""));
		dispatch(updateToggleOutput(false));
	};

	useEffect(() => {
		if (location.pathname.startsWith("/practiceproblems")) {
			const fetchData = async () => {
				try {
					const q = await fetchQuestionById(id);
					setQuestion(q);
				} catch (error) {
					console.error("Error fetching questions:", error);
				}
			};
			fetchData();
		}
	}, [location.pathname, id]);

	return (
		<button
			className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-muted transition-colors hover:bg-[#F1F2F3] hover:text-ink"
			onClick={handleResetClick}
			title="Reset code"
		>
			<i className="fas fa-undo text-md"></i>
		</button>
	);
};

export default ResetCode;