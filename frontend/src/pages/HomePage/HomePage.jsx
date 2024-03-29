/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
function HomePage() {
        return (
                <>
                        <Header />
                        <div className="flex h-[100%] justify-around  text-white font-sans text-left">
                                <div className=" max-w-[32%] font-bold mt-44">
                                        <p className="text-6xl">BeatCode</p>
                                        <p className="text-4xl mt-6">A better way to level up your coding.</p>
                                        <div className="flex justify-between mt-12 gap-2 ">
                                                <button className="text-green-600 w-[16vw] text-2xl border-2 border-green-600 rounded-full p-4  hover:bg-green-600 hover:text-white">
                                                        <Link to="/practiceproblems">Practice Problems</Link>
                                                </button>
                                                <button className="text-green-600 w-[16vw] text-2xl border-2 border-green-600 rounded-full p-4  hover:bg-green-600 hover:text-white">
                                                        <Link to="/onlinecompiler">Online Compiler</Link>
                                                </button>
                                        </div>
                                </div>
                                <img src="Home-Page-Tree.svg" alt="Coding Tree Image" className="w-[40%]  mt-10 " />
                        </div>
                        <Footer />
                </>
        );
}

export default HomePage;
