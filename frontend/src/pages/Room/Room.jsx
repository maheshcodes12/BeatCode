import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { isLoggedIn } from "../../components/Login/isLoggedIn";
import Register from "../../components/Login/Register";
import { useNavigate } from "react-router-dom";

const Room = () => {
	const navigate = useNavigate();
	function hostClick() {
		const roomID = Math.random().toString(36).substring(7);
		navigate(`/room/${roomID}`);
	}
	function joinClick() {
		const roomID = document.getElementById("roomid").value;
		if (roomID) navigate(`/room/${roomID}`);
	}

	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="flex flex-1 items-center justify-center p-4">
				{!isLoggedIn() ? (
					<div className="flex w-full max-w-[420px] flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center">
						<p className="text-base text-ink-muted">
							To use Code Room, please register yourself, thank you 😊
						</p>
						<Register />
					</div>
				) : (
					<div className="grid w-full max-w-[820px] grid-cols-1 gap-5 md:grid-cols-2">
						<div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center">
							<div>
								<h2 className="font-display text-lg font-bold text-ink">Host a room</h2>
								<p className="mt-1 text-sm text-ink-muted">Start a new session and share the ID</p>
							</div>
							<button
								onClick={hostClick}
								className="rounded-[9px] bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
							>
								Host a room
							</button>
						</div>

						<div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center">
							<div>
								<h2 className="font-display text-lg font-bold text-ink">Join a room</h2>
								<p className="mt-1 text-sm text-ink-muted">Enter the room ID you were given</p>
							</div>
							<div className="flex w-full gap-2">
								<input
									className="h-10 w-full flex-1 rounded-[9px] border border-border bg-bg px-3 text-sm text-ink outline-none transition-colors focus:border-brand"
									type="text"
									name="roomid"
									id="roomid"
									placeholder="Room ID"
									autoComplete="off"
								/>
								<button
									onClick={joinClick}
									className="rounded-[9px] border border-border px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#F1F2F3]"
								>
									Join
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Room;