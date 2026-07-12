import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { handlegoogleRedirect } from "../../services/getGoogleAuth";

function GoogleRedirect() {
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const code = params.get("code");

	useEffect(() => {
		handlegoogleRedirect(code);
	}, []);

	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
				<i className="fa-brands fa-google text-3xl text-ink-faint"></i>
				<h1 className="font-display text-xl font-bold text-ink">Signing you in with Google…</h1>
				<p className="text-sm text-ink-muted">Please wait a moment.</p>
			</div>
			<Footer />
		</div>
	);
}

export default GoogleRedirect;