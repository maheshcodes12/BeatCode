import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../components/Login/isLoggedIn";
import { getUserData } from "../../services/getUserData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

const Settings = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (isLoggedIn()) {
			const email = localStorage.getItem("email");
			async function handle() {
				const res = await getUserData(email);
				setUser(res.data);
			}
			handle();
		}
	}, []);

	function getDaysSince(dateString) {
		const currentDate = new Date();
		const createDate = new Date(dateString);
		const differenceMs = currentDate - createDate;
		return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
	}

	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="flex flex-1 items-center justify-center p-4">
				{user ? (
					<div className="flex w-full max-w-[580px] flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 py-16 text-center">
						<img
							className="h-16 w-16 rounded-full"
							src={`https://ui-avatars.com/api/?name=${user.email.charAt(0)}&background=random`}
							alt="userProfile"
						/>
						<div className="w-full">
							<div className="mb-4">
								<div className="font-display text-2xl font-bold text-ink">{user.username}</div>
								<div className="mt-0.5 text-md text-ink-faint">{user.email}</div>
							</div>
							<div className="rounded-lg border border-border bg-[#FBFBFB] px-4 py-2.5 text-md text-ink-muted">
								BeatCoder for {getDaysSince(user.createdAt)} days
							</div>
						</div>
					</div>
				) : (
					<Loading />
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Settings;