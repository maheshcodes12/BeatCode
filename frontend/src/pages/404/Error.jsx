/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

function ErrorPage() {
        return (
                <>
                        <Header />
                        <div className="w-full h-[87.5vh] flex justify-around items-center px-12">
                                <div className="w-[60%]">
                                        <div className="text-white font-sans text-6xl p-5">Oops, this page doesnt exist</div>
                                        <div className="text-white font-sans text-4xl p-5">
                                                Go back to{" "}
                                                <Link className="text-yellow-500" to={"/"}>
                                                        home page
                                                </Link>
                                        </div>
                                </div>
                                <div className="w-[40%] flex justify-center items-center">
                                        <img src="../../public/Error.png" alt="Error404" />
                                </div>
                        </div>
                        <Footer />
                </>
        );
}

export default ErrorPage;
