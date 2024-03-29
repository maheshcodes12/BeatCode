/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function OutputWindow({ outputValue }) {
        return (
                <>
                        <p className="text-[white] text-2xl">Output</p>
                        <textarea
                                placeholder="Output will be displayed here"
                                className="bg-[#272822] text-[aliceblue] w-[28.5vw] h-[48%] resize-none text-xl leading-[1.1] border p-2.5 rounded-[10px] border-solid border-[white]"
                                readOnly
                                value={outputValue}
                        ></textarea>
                </>
        );
}

export default OutputWindow;
