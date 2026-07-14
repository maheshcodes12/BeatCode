import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { isLoggedIn } from "../../components/Login/isLoggedIn";
import SubmissionList from "../../components/SubmissionList/SubmissionList";
import Register from "../../components/Login/Register";

const SubmissionPage = () => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="flex flex-1 items-center justify-center p-4">
				{isLoggedIn() ? (
					<SubmissionList />
				) : (
					<div className="flex w-full max-w-[520px] flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center">
						<p className="text-lg text-ink-muted">To use this feature please register yourself, thank you 😊</p>
						<Register />
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default SubmissionPage;