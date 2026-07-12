import React, { useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import ResetCode from "./ResetCode";
import Settings from "./Settings";
import { useDispatch } from "react-redux";
import { updateCode } from "../../redux/slices/codeSlice";
import { updateLanguage } from "../../redux/slices/languageSlice";
import { updateOutput } from "../../redux/slices/outputSlice";
import { updateUserInput } from "../../redux/slices/userInputSlice";
import { useLocation } from "react-router-dom";

const NavBar = ({ socket, roomID }) => {
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateLanguage("java"));
		dispatch(updateOutput(""));
		dispatch(updateUserInput(""));
		dispatch(updateCode(""));
	}, location.pathname);

	return (
		<div className="flex h-full w-full items-center gap-3 border-b border-border bg-surface px-3">
			<div className="w-[120px] flex-shrink-0 sm:w-[140px]">
				<LanguageSelector socket={socket} roomID={roomID} />
			</div>
			<div className="ml-auto flex items-center gap-2">
				<ResetCode />
				<Settings />
				<div className="w-[100px]">
					<RunButton />
				</div>
			</div>
		</div>
	);
};

export default NavBar;