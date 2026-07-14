import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const email = localStorage.getItem("email");
	const username = localStorage.getItem("username");
	const initial = username?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase();
	const frontendURL = import.meta.env.VITE_FRONTEND_URL;

	const handleLogout = () => {
		localStorage.clear();
		toast.success("Logging out, bye bye", { autoClose: 1500 });
		setTimeout(() => {
			window.location.href = frontendURL;
		}, 1500);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-md font-semibold text-white transition-opacity hover:opacity-90"
			>
				{initial}
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
					<div className="absolute right-0 top-11 z-50 w-72 rounded-xl border border-border bg-surface p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
						<div className="border-b border-border px-3 py-3">
							<div className="font-display text-md font-semibold text-ink">{username}</div>
							<div className="mt-0.5 truncate text-sm text-ink-faint">{email}</div>
						</div>
						<div className="flex flex-col py-1">
							<Link
								to="/submissions"
								onClick={() => setIsOpen(false)}
								className="rounded-md px-3 py-2 text-md text-ink-muted transition-colors hover:bg-[#F1F2F3] hover:text-ink"
							>
								View submissions
							</Link>
							<Link
								to="/settings"
								onClick={() => setIsOpen(false)}
								className="rounded-md px-3 py-2 text-md text-ink-muted transition-colors hover:bg-[#F1F2F3] hover:text-ink"
							>
								Settings
							</Link>
						</div>
						<div className="border-t border-border pt-1">
							<button
								onClick={handleLogout}
								className="w-full rounded-md px-3 py-2 text-left text-md font-medium text-hard transition-colors hover:bg-[#FBEAEA]"
							>
								Log out
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;