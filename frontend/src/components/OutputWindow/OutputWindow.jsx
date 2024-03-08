/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import "./OutputWindow.css";
import { useBody } from "../../context/BodyContext";
function OutputWindow({ outputValue }) {
	const { body, updateBody } = useBody();
	const { output } = body;

	return (
		<div className='w-[100%] h-[100%]'>
			<p className='text-[#bcaf3a] text-2xl pl-2'>Output</p>
			<textarea
				placeholder='Output will be displayed here'
				id='userOutput'
				className='bg-[#272822] text-[aliceblue] w-[100%] h-[100%] resize-none text-xl leading-[1.1] border p-2.5 rounded-[10px] border-solid border-[white]'
				readOnly
				value={output}></textarea>
		</div>
	);
}

export default OutputWindow;
