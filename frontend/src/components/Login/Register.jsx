import { useState } from "react";
import { signup, login } from "../../services/registerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getGoogleAuth } from "../../services/getGoogleAuth";

const Register = () => {
	const [userData, setUserData] = useState({ username: "", email: "", password: "" });
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("login");

	const openModal = (tab) => {
		setActiveTab(tab);
		setIsOpen(true);
	};
	const closeModal = () => setIsOpen(false);

	const handleRegister = async (type) => {
		if (type === "signup" && !userData.username) {
			toast.warn("Username is required");
			return;
		}
		if (!userData.email) {
			toast.warn("Email is required");
			return;
		} else if (!/\S+@\S+\.\S+/.test(userData.email)) {
			toast.warn("Invalid email format");
			return;
		}
		if (!userData.password) {
			toast.warn("Password is required");
			return;
		} else if (userData.password.length < 6) {
			toast.warn("Password must be at least 6 characters long");
			return;
		}
		if (type === "signup") await signup(userData);
		if (type === "login") await login(userData, "normal");
	};

	const handleKeyDown = (event, type) => {
		if (event.key === "Enter") handleRegister(type);
	};

	return (
		<>
			<div className="flex items-center gap-2">
				<button
					onClick={() => openModal("login")}
					className="rounded-[9px] border border-border px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-[#F1F2F3]"
				>
					Log in
				</button>
				<button
					onClick={() => openModal("signup")}
					className="rounded-[9px] bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
				>
					Sign up
				</button>
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
					<div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={closeModal} />

					<div className="relative z-[1001] w-full max-w-[380px] rounded-2xl border border-border bg-surface p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
						<div className="mb-6 flex rounded-lg border border-border bg-[#FBFBFB] p-1">
							<button
								onClick={() => setActiveTab("login")}
								className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
									activeTab === "login" ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
								}`}
							>
								Log In
							</button>
							<button
								onClick={() => setActiveTab("signup")}
								className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
									activeTab === "signup" ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
								}`}
							>
								Sign Up
							</button>
						</div>

						{activeTab === "signup" ? (
							<div className="flex flex-col gap-3">
								<h2 className="mb-1 font-display text-xl font-bold text-ink">Create your account</h2>
								<input
									className="rounded-[9px] border border-border bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand"
									placeholder="Username"
									type="text"
									value={userData.username}
									onChange={(e) => setUserData({ ...userData, username: e.target.value })}
									onKeyDown={(e) => handleKeyDown(e, "signup")}
									autoComplete="off"
								/>
								<input
									className="rounded-[9px] border border-border bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand"
									placeholder="Email address"
									type="email"
									value={userData.email}
									onChange={(e) => setUserData({ ...userData, email: e.target.value })}
									onKeyDown={(e) => handleKeyDown(e, "signup")}
									autoComplete="off"
								/>
								<input
									className="rounded-[9px] border border-border bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand"
									placeholder="Password"
									type="password"
									value={userData.password}
									onChange={(e) => setUserData({ ...userData, password: e.target.value })}
									onKeyDown={(e) => handleKeyDown(e, "signup")}
									autoComplete="off"
								/>
								<button
									onClick={() => handleRegister("signup")}
									className="mt-1 rounded-[9px] bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
								>
									Get started
								</button>
								<button
									onClick={getGoogleAuth}
									className="flex items-center justify-center gap-2 rounded-[9px] border border-border py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#F1F2F3]"
								>
									<i className="fa-brands fa-google" /> Sign up with Google
								</button>
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<h2 className="mb-1 font-display text-xl font-bold text-ink">Welcome back</h2>
								<input
									className="rounded-[9px] border border-border bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand"
									placeholder="Email address"
									type="email"
									value={userData.email}
									onChange={(e) => setUserData({ ...userData, email: e.target.value })}
									onKeyDown={(e) => handleKeyDown(e, "login")}
									autoComplete="off"
								/>
								<input
									className="rounded-[9px] border border-border bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand"
									placeholder="Password"
									type="password"
									value={userData.password}
									onChange={(e) => setUserData({ ...userData, password: e.target.value })}
									onKeyDown={(e) => handleKeyDown(e, "login")}
									autoComplete="off"
								/>
								<button
									onClick={() => handleRegister("login")}
									className="mt-1 rounded-[9px] bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
								>
									Log in
								</button>
								<button
									onClick={getGoogleAuth}
									className="flex items-center justify-center gap-2 rounded-[9px] border border-border py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#F1F2F3]"
								>
									<i className="fa-brands fa-google" /> Sign in with Google
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Register;