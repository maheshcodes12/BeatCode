import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

function ErrorPage() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
				<div className="font-mono text-6xl font-bold text-brand-soft">404</div>
				<h1 className="font-display text-2xl font-bold text-ink">This page doesn't exist</h1>
				<p className="text-ink-muted">
					Go back to{" "}
					<Link className="font-semibold text-brand hover:text-brand-hover" to="/">
						home
					</Link>
				</p>
			</div>
			<Footer />
		</div>
	);
}

export default ErrorPage;