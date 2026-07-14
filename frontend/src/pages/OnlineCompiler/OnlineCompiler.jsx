import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LeftPart from "../../components/LeftPart/LeftPart";
import RightPart from "../../components/RightPart/RightPart";

function OnlineCompiler() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 p-4 lg:flex-row">
				<LeftPart />
				<RightPart />
			</div>
			<Footer />
		</div>
	);
}

export default OnlineCompiler;