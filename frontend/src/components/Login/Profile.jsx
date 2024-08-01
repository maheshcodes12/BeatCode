/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Settings from "../../pages/Settings/Settings";
import { Box, Button, Drawer, IconButton, List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Profile = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const email = localStorage.getItem("email");
	const username = localStorage.getItem("username");
	const firstLetter = email?.charAt(0);
	const avatarUrl = `https://ui-avatars.com/api/?name=${firstLetter}&background=random`;

	const frontendURL = import.meta.env.VITE_FRONTEND_URL;
	const toggleDrawer = (isDropdownOpen) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setIsDropdownOpen(isDropdownOpen);
	};
	const handleLogout = () => {
		localStorage.clear();
		toast.success("Logging out , bye bye", { autoClose: 2000 });
		setTimeout(() => {
			window.location.href = frontendURL;
		}, 2000);
	};
	return (
		<Box position={"relative"}>
			<Box onClick={toggleDrawer(true)}>
				<img
					className='h-10 rounded-[50%] border-white border-[2px] cursor-pointer'
					src={avatarUrl}
					alt='userProfile'
				/>
			</Box>
			<Drawer
				anchor='right'
				open={isDropdownOpen}
				onClose={toggleDrawer(false)}
				PaperProps={{
					style: { height: "100%", width: "100%" },
				}}>
				<IconButton
					onClick={toggleDrawer(false)}
					edge='end'
					color='inherit'
					aria-label='close'
					style={{ position: "absolute", right: 16, top: 16 }}>
					<CloseIcon />
				</IconButton>
				<List
					style={{ marginTop: 64 }}
					sx={{
						display: "flex",
						gap: 4,
						flexDirection: "column",
						justifyContent: "center",
						alignContent: "center",
						textAlign: "center",
					}}>
					<Box>{username}</Box>
					<Box>{email}</Box>
					<Link to={"/submissions"}>View Submissions</Link>
					<Link to={"/settings"}>Settings</Link>
					<Box onClick={handleLogout}>Logout</Box>
				</List>
			</Drawer>
		</Box>
	);
};

export default Profile;
