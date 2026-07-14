import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getUserData } from "../../services/getUserData";
import { getLeaderBoard } from "../../services/getLeaderBoard";
import Loading from "../../components/Loading/Loading";

const medalClass = { 1: "text-[#FFD700]", 2: "text-[#B8B8B8]", 3: "text-[#CD7F32]" };

function LeaderBoard() {
	const [data, setData] = useState();
	const [toggle, setToggle] = useState(false);
	const [user, setUser] = useState();

	useEffect(() => {
		async function fetchData() {
			const leaderboardData = await getLeaderBoard();
			leaderboardData.sort((a, b) => b.attemptedQuestions.length - a.attemptedQuestions.length);
			setData(leaderboardData);
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function getUser() {
			if (toggle != false) {
				const res = await getUserData(toggle);
				setUser(res.data);
			}
		}
		getUser();
	}, [toggle]);

	function handleClick(email) {
		setToggle(email);
	}

	function getDaysSince(dateString) {
		const currentDate = new Date();
		const createDate = new Date(dateString);
		const differenceMs = currentDate - createDate;
		return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
	}

	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="mx-auto w-full max-w-[1380px] flex-1 p-4 lg:p-8">
				{data ? (
					<div className="overflow-hidden rounded-xl border border-border bg-surface">
						<table className="w-full border-collapse text-left">
							<thead>
								<tr className="border-b border-border text-md font-semibold uppercase tracking-wide text-ink-faint">
									<th className="w-[10%] p-3 text-center">#</th>
									<th className="w-[60%] p-3">User</th>
									<th className="w-[30%] p-3 text-right">Solved</th>
								</tr>
							</thead>
							<tbody>
								{data.map((entry, index) => (
									<tr
										key={entry.email}
										className="cursor-pointer border-b border-border text-md transition-colors last:border-b-0 hover:bg-[#FBFBFB]"
										onClick={() => handleClick(entry.email)}
									>
										<td className="p-3 text-center font-mono text-ink-faint">
											{medalClass[index + 1] ? (
												<i className={`fa-solid fa-crown ${medalClass[index + 1]}`}></i>
											) : (
												index + 1
											)}
										</td>
										<td className="p-3">
											<div className="flex items-center gap-2.5">
												<img
													className="h-8 w-8 rounded-full"
													src={`https://ui-avatars.com/api/?name=${entry.email.charAt(0)}&background=random`}
													alt="userProfile"
												/>
												<span className="font-medium text-ink">{entry.username}</span>
											</div>
										</td>
										<td className="p-3 text-right font-medium text-ink-muted">
											{entry.attemptedQuestions.length}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="flex h-[50vh] items-center justify-center text-ink-muted">Loading leaderboard...</div>
				)}
			</div>

			{toggle && (
				<div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
					<div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => handleClick(false)} />
					<div className="relative z-[1001] w-full max-w-[520px] rounded-2xl border border-border bg-surface p-6 py-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
						{user ? (
							<div className="flex flex-col items-center gap-4 text-center">
								<img
									className="h-16 w-16 rounded-full"
									src={`https://ui-avatars.com/api/?name=${user.email.charAt(0)}&background=random`}
									alt="userProfile"
								/>
								<div>
									<div className="font-display text-lg font-bold text-ink">{user.username}</div>
									<div className="mt-0.5 text-md text-ink-faint">{user.email}</div>
								</div>
								<div className="w-full rounded-lg border border-border bg-[#FBFBFB] px-4 py-2.5 text-md text-ink-muted">
									BeatCoder for {getDaysSince(user.createdAt)} days
								</div>
							</div>
						) : (
							<div className="flex h-[160px] items-center justify-center">
								<Loading />
							</div>
						)}
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
}

export default LeaderBoard;