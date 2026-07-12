import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInput } from "../../redux/slices/userInputSlice";

const InputWindow = ({ socket, roomID }) => {
	const userInput = useSelector((state) => state.userInput?.value);
	const dispatch = useDispatch();
	const handleInputChange = (event) => {
		dispatch(updateUserInput(event.target.value));
		socket &&
			socket.emit("inputUpdate", {
				userInput: event.target.value,
				roomID: roomID,
			});
	};
	return (
		<div className="flex h-full w-full flex-col gap-2 p-3">
			<p className="font-display text-sm font-semibold text-ink">
				Input <span className="ml-1 font-sans text-xs font-normal text-ink-faint">(optional, before running)</span>
			</p>
			<textarea
				className="h-full w-full resize-none rounded-lg border border-border bg-[#FBFBFB] p-3 font-mono text-sm leading-relaxed text-ink outline-none focus:border-brand"
				name="userInput"
				id="userInput"
				value={userInput || ""}
				placeholder="Enter input value here"
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default InputWindow;