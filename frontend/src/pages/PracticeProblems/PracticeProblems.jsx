import React, { useEffect, useState } from "react";
import ProblemList from "../../components/ProblemList/ProblemList";
import Header from "../../components/Header/Header";
import Stats from "../../components/Stats/Stats";
import Footer from "../../components/Footer/Footer";
import { getUserStatus } from "../../services/getUserStats";
import { isLoggedIn } from "../../components/Login/isLoggedIn";

const PracticeProblems = () => {
	const [response, setResponse] = useState();

	useEffect(() => {
		if (isLoggedIn()) {
			const email = localStorage.getItem("email");
			async function handleStats() {
				const res = await getUserStatus(email);
				setResponse(res);
			}
			handleStats();
		}
	}, []);

	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="mx-auto flex w-full max-w-[1380px] flex-1 flex-col gap-5 p-4 lg:flex-row lg:p-6">
				<div className="w-full lg:w-[280px] lg:flex-shrink-0">
					<Stats response={response} />
				</div>
				<div className="h-[60vh] w-full lg:h-auto lg:flex-1">
					<ProblemList response={response} />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PracticeProblems;