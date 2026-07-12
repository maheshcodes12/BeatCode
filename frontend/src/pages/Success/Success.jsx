import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Success() {
	const location = useLocation();
	const url = import.meta.env.VITE_FRONTEND_URL;

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const token = params.get("token");
		const username = params.get("username");
		const email = params.get("email");

		if (token && username && email) {
			localStorage.setItem("username", username);
			localStorage.setItem("email", email);
			localStorage.setItem("token", token);
			toast.success(`Welcome back, ${username}. Please wait for reload.`, {
				autoClose: 1500,
				position: "bottom-right",
			});
		} else {
			toast.warn("login failed 🫥 , please try again", { autoClose: 1500, position: "bottom-right" });
		}
		setTimeout(() => {
			window.location.href = url;
		}, 1700);
	}, [location.search, url]);

	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
				<i className="fa-solid fa-circle-check text-4xl text-easy"></i>
				<h1 className="font-display text-xl font-bold text-ink">Signing you in…</h1>
				<p className="text-sm text-ink-muted">
					Redirecting to{" "}
					<Link className="font-semibold text-brand" to="/">
						home
					</Link>
				</p>
			</div>
			<Footer />
		</div>
	);
}

export default Success;