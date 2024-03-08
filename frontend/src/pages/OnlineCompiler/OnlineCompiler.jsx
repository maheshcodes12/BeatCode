/* eslint-disable no-unused-vars */
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LeftPart from "../../components/LeftPart/LeftPart";
import RightPart from "../../components/RightPart/RightPart";

function OnlineCompiler() {
	return (
		<>
			<Header />
			<div className='flex h-[88vh] justify-evenly gap-4'>
				<LeftPart />
				<RightPart />
			</div>

			<Footer />
		</>
	);
}

export default OnlineCompiler;
