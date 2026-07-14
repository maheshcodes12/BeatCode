import { React, useEffect, useState } from "react";
import { runCompilerCode, runPracticeCode } from "../../services/runCodeApi";
import { isLoggedIn } from "../Login/isLoggedIn";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateOutput } from "../../redux/slices/outputSlice";
import { updateToggleOutput } from "../../redux/slices/toggleOutput";
import { updatePracticeStatus } from "../../redux/slices/practiceStatusSlice";

const RunButton = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [userName, setUserName] = useState("");
	const location = useLocation();
	const { id } = useParams();
	const code = useSelector((state) => state.code?.value);
	const userInput = useSelector((state) => state.userInput?.value);
	const language = useSelector((state) => state.language?.value);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isLoggedIn()) {
			setUserEmail(localStorage.getItem("email"));
			setUserName(localStorage.getItem("username"));
		}
	}, []);

	const handleClick = async () => {
		if (!isLoggedIn()) {
			toast.warn("To save your submissions, please register", { position: "bottom-right" });
		}
		setIsLoading(true);
		try {
			if (location.pathname.startsWith("/onlinecompiler") || location.pathname.startsWith("/room")) {
				const reqBody = { code, userInput, language, userEmail, userName };
				const result = await runCompilerCode(reqBody);
				if (result.stdout) {
					dispatch(updateOutput(result.stdout));
					dispatch(updateToggleOutput(true));
				} else {
					dispatch(
						updateOutput(
							`Error During Execution (Please check for semicolons and syntax errors) : \n ${result.stderr}`
						)
					);
					dispatch(updateToggleOutput(true));
				}
			}
			if (location.pathname.startsWith("/practiceproblems")) {
				const reqBody = { code, language, userEmail, questionID: id, userName };
				const result = await runPracticeCode(reqBody);
				if (result?.resp?.stdout) {
					const index = result.resp.stdout?.indexOf("Test case 1");
					const trimmed_result = result.resp.stdout?.substring(index);
					dispatch(updateOutput(trimmed_result));
					dispatch(updateToggleOutput(true));
					dispatch(updatePracticeStatus(result.status));
				} else {
					dispatch(
						updateOutput(
							`Error During Execution (Please check for semicolons and syntax errors) : \n ${result.stderr}`
						)
					);
					dispatch(updateToggleOutput(true));
				}
			}
		} catch (err) {
			console.error("error : " + err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			className="h-9 w-full rounded-lg bg-brand px-4 text-md font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
			onClick={handleClick}
			disabled={isLoading}
		>
			{isLoading ? "Running..." : "Run"}
		</button>
	);
};

export default RunButton;