/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Register from "../Login/Register";
import { isLoggedIn } from "../Login/isLoggedIn";
import Profile from "../Login/Profile";
import { Link } from "react-router-dom";
import {
	AppBar,
	Button,
	colors,
	styled,
	Toolbar,
	Typography,
	Box,
} from "@mui/material";

import { theme } from "../../theme";

const Header = () => {
	const StyledToolbar = styled(Toolbar)({
		display: "flex",
		justifyContent: "space-evenly",
		alignContent: "center",
		gap: 30,
	});
	return (
		<AppBar
			position='static'
			color='primary'>
			<StyledToolbar>
				<Box
					bgcolor='#fb690a'
					borderRadius={theme.shape.borderRadius}
					justifyContent={"center"}
					display={"flex"}
					p={1}
					flex={2}
					maxWidth={120}>
					<Link to='/'>
						<img
							width={120}
							height={50}
							src='/logo.svg'
							alt='beatcode-logo'
						/>
					</Link>
				</Box>
				<Box
					display={"flex"}
					flexDirection={"column"}
					sx={{ display: { sm: "flex", md: "none" } }}>
					<Link to='/practiceproblems'>Practice Problems</Link>
					<Link to='/onlinecompiler'>Online Compiler</Link>
					<Link to='/room'>Code Room</Link>
					<Link to='/leaderboard'>Leaderboard</Link>
				</Box>

				<Box
					flex={10}
					justifyContent={"left"}
					display={"flex"}
					gap={4}
					sx={{ display: { sm: "none", md: "flex" } }}>
					<Link to='/practiceproblems'>Practice Problems</Link>
					<Link to='/onlinecompiler'>Online Compiler</Link>
					<Link to='/room'>Code Room</Link>
					<Link to='/leaderboard'>Leaderboard</Link>
				</Box>
				<Box
					flex={1}
					justifyContent={"center"}
					display={"flex"}>
					<div>{isLoggedIn() ? <Profile /> : <Register />}</div>
				</Box>

				{/* <div className='fixed left-0 w-full h-full z-[1999] bg-[rgba(0,0,0,0.5)]  top-0'></div>
				<div className='fixed z-[2000] left-[10%] top-[20%] w-[10%] pl-8'>
					<i className='fa-solid fa-xmark ml-auto text-3xl'></i>
				</div> */}

				{/* <div className='fixed w-[70%] h-[50%] left-[15%] top-[25%] flex justify-center  flex-col p-4 gap-2  items-center bg-[#272822]  z-[2000] shadow-sm'>
					<div className='text-xl py-1 flex flex-col justify-around h-full items-center border border-solid w-full'>
						<div className='w-full flex justify-center items-center h-[20%]'>
							<div className='rounded-xl border p-2 bg-green-600'>
								<Link to='/'>Home</Link>
							</div>
						</div>
						<div className='w-full flex justify-center items-center h-[20%]'>
							<div className='rounded-xl border p-2 bg-green-600'>
								<Link to='/practiceproblems'>Practice Problems</Link>
							</div>
						</div>
						<div className='w-full flex justify-center items-center h-[20%]'>
							<div className='rounded-xl border p-2 bg-green-600'>
								<Link to='/onlinecompiler'>Online Compiler</Link>
							</div>
						</div>
						<div className='w-full flex justify-center items-center h-[20%]'>
							<div className='rounded-xl border p-2 bg-green-600'>
								<Link to='/room'>Code Room</Link>
							</div>
						</div>
						<div className='w-full flex justify-center items-center h-[20%]'>
							<div className='rounded-xl border p-2 bg-green-600'>
								<Link to='leaderboard'>Leaderboard</Link>
							</div>
						</div>
					</div>
				</div> */}
				{/* <div className='flex w-full h-full justify-between items-center px-4'>
					<div className='w-[10%]'>
						<i className='fa-solid fa-bars ml-auto text-3xl'></i>
					</div>

					<div className='w-[50%]  flex justify-center items-center'>
						<div className='bg-[#fb690a] w-full p-2 rounded-xl flex justify-center items-center'>
							<Link to='/'>
								<img
									className='w-[100%] flex justify-center items-center'
									src='/logo.svg'
									alt='beatcode-logo'
								/>
							</Link>
						</div>
					</div>
					<div className='w-[20%]'>
						<div>{isLoggedIn() ? <Profile /> : <Register />}</div>
					</div>
				</div>

				<div className='flex w-full h-full justify-between items-center px-4'>
					<div className='w-[10%]'>
						<i className='fa-solid fa-bars ml-auto text-3xl'></i>
					</div>

					<div className='w-[50%]  flex justify-center items-center'>
						<div className='bg-[#fb690a] w-full p-2 rounded-xl flex justify-center items-center'>
							<Link to='/'>
								<img
									className='w-[100%] flex justify-center items-center'
									src='/logo.svg'
									alt='beatcode-logo'
								/>
							</Link>
						</div>
					</div>
					<div className='w-[20%]'>
						<div>{isLoggedIn() ? <Profile /> : <Register />}</div>
					</div>
				</div> */}
			</StyledToolbar>
		</AppBar>
	);
};

export default Header;
