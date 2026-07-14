/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import InputWindow from "../../components/InputWindow/InputWindow";
import OutputWindow from "../../components/OutputWindow/OutputWindow";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import peer from "../../services/peer";
import { isLoggedIn } from "../../components/Login/isLoggedIn";
import Register from "../../components/Login/Register";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { updateCode } from "../../redux/slices/codeSlice";
import { updateLanguage } from "../../redux/slices/languageSlice";
import { updateUserInput } from "../../redux/slices/userInputSlice";

const CodeRoom = () => {
	const dispatch = useDispatch();
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const [users, setUsers] = useState([]);
	const [me, setMe] = useState({
		username: "User 1",
		socketID: "",
	});
	const [otherUser, setOtherUser] = useState({
		username: "User 2",
		socketID: "",
	});

	const location = useLocation();
	const [socket, setSocket] = useState(null);
	const { roomID } = useParams();
	useEffect(() => {
		if (!socket && isLoggedIn()) {
			setSocket(io(backendUrl));
			socket && socket.emit("languageChange", { language: "java", roomID: roomID });
		}
		if (!isLoggedIn()) {
			window.location.href = frontendUrl + "/room";
		}

		return () => {
			socket?.disconnect();
		};
	}, [socket]);

	const navigate = useNavigate();
	const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
	function leaveRoom() {
		myStream &&
			myStream.getTracks().forEach((track) => {
				track.stop();
			});

		socket && socket.emit("endVideoCall", { to: otherUser.socketID });
		window.location.href = frontendUrl + "/room";
	}

	useEffect(() => {
		const username = localStorage.getItem("username");
		socket && socket.emit("userdetails", { username: username, roomID: roomID });
		socket &&
			socket.on("getUserDetails", (userRoom) => {
				const { users } = userRoom;
				setUsers(users);

				if (users.length == 1) {
					setMe(users[0]);
					setOtherUser({
						username: "User 2",
						socketID: "",
					});
					const userNamesString = users[0].username;
					toast.info(`1 Room member : ${userNamesString}`, {
						position: "top-right",
					});
				}
				if (users.length == 2) {
					if (users[0].username == username) {
						setMe(users[0]);
						setOtherUser(users[1]);
					} else {
						setMe(users[1]);
						setOtherUser(users[0]);
					}
					const userNamesString = users[0].username + " and " + users[1].username;
					toast.info(`2 Room members : ${userNamesString}`, {
						position: "top-right",
					});
				}
			});
		socket &&
			socket.on("roomFull", () => {
				toast.warn("The room is already full");
				navigate("/room");
			});

		return () => {
			socket && socket.off("getUserDetails");
			socket && socket.off("roomFull");
		};
	}, [socket]);

	useEffect(() => {
		socket && socket.emit("languageChange", { language: "cpp", roomID: roomID });
	}, []);

	useEffect(() => {
		socket &&
			socket.on("codeUpdate", ({ code }) => {
				dispatch(updateCode(code));
			});

		socket &&
			socket.on("inputUpdate", ({ userInput }) => {
				dispatch(updateUserInput(userInput));
			});
		socket &&
			socket.on("languageChange", ({ language }) => {
				dispatch(updateLanguage(language));
			});

		return () => {
			socket && socket.off("codeUpdate");
			socket && socket.off("inputUpdate");
			socket && socket.off("languageChange");
		};
	}, [socket]);
	useEffect(() => {
		return () => {
			if (myStream) {
				myStream.getTracks().forEach((track) => {
					track.stop();
				});
			}
			if (socket) {
				socket.emit("endVideoCall", { to: otherUser.socketID });
			}
		};
	}, []);
	//Video Call Logic
	const [myStream, setMyStream] = useState();
	const [otherStream, setOtherStream] = useState();
	const [acceptCallButton, setAcceptCallButton] = useState(false);
	const [endCall, setEndCall] = useState(false);

	const startVideoCall = useCallback(async () => {
		if (otherUser.username === "User 2") {
			toast.warn("Wait for second person to join !");
		} else {
			setEndCall(true);
			console.log("starting video call ... ");
			setAcceptCallButton(false);
			toast.info("Starting Video Call", { position: "top-right" });

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});

			const offer = await peer.getOffer();
			socket.emit("startCall", { to: otherUser.socketID, offer });
			stream && setMyStream(stream);
		}
	}, [otherUser.socketID, socket]);
	function endVideoCall() {
		setEndCall(false);
		setAcceptCallButton(false);
		console.log("ending video call ...");
		if (myStream) {
			myStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		if (otherStream) {
			otherStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		peer.setLocalDescription("endCall");
		setMyStream(null);
		setOtherStream(null);
		socket && socket.emit("endVideoCall", { to: otherUser.socketID });
		toast.info("Ending Video Call", { position: "top-right" });
	}

	const incommingCall = useCallback(
		async ({ from, offer }) => {
			if (!endCall) {
				setAcceptCallButton(true);
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});
			const videoTracks = stream.getVideoTracks();
			const videoStream = new MediaStream(videoTracks);
			setMyStream(videoStream);
			const answer = await peer.getAnswer(offer);
			socket.emit("callAccepted", { to: from, answer });
		},
		[socket]
	);

	const sendStreams = useCallback(() => {
		for (const track of myStream.getTracks()) {
			peer.peer.addTrack(track, myStream);
		}
	}, [myStream]);

	const handleCallAccepted = useCallback(
		({ from, answer }) => {
			peer.setLocalDescription(answer);
			sendStreams();
		},
		[sendStreams]
	);

	const handleEndCall = useCallback(() => {
		if (myStream) {
			myStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		if (otherStream) {
			otherStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		setOtherStream(null);
		setMyStream(null);
		setEndCall(false);
		setAcceptCallButton(false);
		peer.setLocalDescription("endCall");
	});

	const handleNegoNeeded = useCallback(async () => {
		const offer = await peer.getOffer();
		socket.emit("peer:nego:needed", { offer, to: otherUser.socketID });
	}, [otherUser.socketID, socket]);

	useEffect(() => {
		peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
		return () => {
			peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
		};
	}, [handleNegoNeeded]);

	const handleNegoNeedIncomming = useCallback(
		async ({ from, offer }) => {
			const answer = await peer.getAnswer(offer);
			socket.emit("peer:nego:done", { to: from, answer });
		},
		[socket]
	);

	const handleNegoNeedFinal = useCallback(async ({ answer }) => {
		await peer.setLocalDescription(answer);
	}, []);

	useEffect(() => {
		peer.peer.addEventListener("track", async (ev) => {
			const remoteStream = ev.streams;
			console.log("GOT TRACKS!!");
			setOtherStream(remoteStream[0]);
		});
	}, []);

	useEffect(() => {
		socket && socket.on("incommingCall", incommingCall);
		socket && socket.on("callAccepted", handleCallAccepted);
		socket && socket.on("peer:nego:needed", handleNegoNeedIncomming);
		socket && socket.on("peer:nego:final", handleNegoNeedFinal);
		socket && socket.on("endVideoCall", handleEndCall);
		return () => {
			socket && socket.off("incommingCall");
			socket && socket.off("callAccepted");
			socket && socket.off("peer:nego:needed");
			socket && socket.off("peer:nego:final");
			socket && socket.off("endVideoCall");
		};
	}, [socket, incommingCall, handleCallAccepted, handleNegoNeedFinal, handleNegoNeedIncomming, handleEndCall]);
	const [screen, setScreen] = useState(window.screen.width);
	window.addEventListener("resize", handleResize);
	function handleResize() {
		setScreen(window.screen.width);
	}

	const CallButton = () =>
		endCall ? (
			<button
				onClick={endVideoCall}
				className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-hard text-md font-semibold text-white transition-colors hover:bg-[#B93A3A]"
			>
				<i className="fa-solid fa-phone-slash"></i> End call
			</button>
		) : acceptCallButton ? (
			<button
				onClick={startVideoCall}
				className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-easy text-md font-semibold text-white transition-colors hover:opacity-90"
			>
				<i className="fa-solid fa-video"></i> Accept call
			</button>
		) : (
			<button
				onClick={startVideoCall}
				className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-brand text-md font-semibold text-white transition-colors hover:bg-brand-hover"
			>
				<i className="fa-solid fa-video"></i> Video call
			</button>
		);

	const RoomIdBar = () => (
		<CopyToClipboard
			text={roomID}
			onCopy={() => toast.success(`Room ID : ${roomID} copied to clipboard`, { position: "top-right" })}
		>
			<div className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-surface px-4 transition-colors hover:bg-[#F1F2F3]">
				<span className="font-mono text-md font-semibold text-ink">{roomID}</span>
				<i className="fa-solid fa-copy text-ink-muted"></i>
			</div>
		</CopyToClipboard>
	);

	const VideoTile = ({ stream, fallbackLabel }) => (
		<div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-code-bg text-xl text-code-text">
			{stream ? (
				<ReactPlayer playing height="100%" width="100%" url={stream} volume={fallbackLabel === "me" ? 0 : 1} />
			) : (
				<span className="text-ink-faint text-code-text">{fallbackLabel}</span>
			)}
		</div>
	);

	if (!isLoggedIn()) {
		return (
			<div className="flex min-h-screen w-full flex-col bg-bg">
				<Header />
				<div className="flex flex-1 items-center justify-center p-4">
					<div className="flex w-full max-w-[420px] flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-8 text-center">
						<p className="text-lg text-ink-muted">
							To use this feature please register yourself, thank you 😊
						</p>
						<Register />
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return screen > 768 ? (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-4 p-4">
				<div className="flex h-[calc(100vh-140px)] w-3/5 flex-col rounded-xl border border-border bg-surface">
					<div className="h-12 flex-shrink-0">
						<NavBar socket={socket} roomID={roomID} />
					</div>
					<div className="flex-1">
						<CodeEditor socket={socket} roomID={roomID} users={users} />
					</div>
				</div>

				<div className="flex h-[calc(100vh-140px)] w-2/5 flex-col gap-4">
					<RoomIdBar />
					<div className="grid h-[38%] w-full grid-cols-2 gap-3">
						<VideoTile stream={myStream} fallbackLabel={myStream ? "me" : me.username} />
						<VideoTile stream={otherStream} fallbackLabel={otherStream ? "them" : otherUser.username} />
					</div>
					<div className="flex gap-3">
						<CallButton />
						<button
							onClick={leaveRoom}
							className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-hard text-sm font-semibold text-white transition-colors hover:bg-[#B93A3A]"
						>
							<i className="fa-solid fa-arrow-right-from-bracket"></i> Leave room
						</button>
					</div>
					<div className="flex flex-1 flex-col gap-3">
						<div className="h-1/2 w-full rounded-xl border border-border bg-surface">
							<InputWindow socket={socket} roomID={roomID} />
						</div>
						<div className="h-1/2 w-full rounded-xl border border-border bg-surface">
							<OutputWindow />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	) : (
		<div className="flex min-h-screen w-full flex-col bg-bg">
			<Header />
			<div className="flex w-full flex-1 flex-col gap-3 p-3">
				<RoomIdBar />

				<div className="grid h-[22vh] w-full grid-cols-2 gap-3">
					<VideoTile stream={myStream} fallbackLabel={myStream ? "me" : me.username} />
					<VideoTile stream={otherStream} fallbackLabel={otherStream ? "them" : otherUser.username} />
				</div>

				<div className="flex gap-3">
					<CallButton />
					<button
						onClick={leaveRoom}
						className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-hard text-md font-semibold text-white transition-colors hover:bg-[#B93A3A]"
					>
						<i className="fa-solid fa-arrow-right-from-bracket text-md"></i> Leave room
					</button>
				</div>

				<div className="flex h-[38vh] w-full flex-col rounded-xl border border-border bg-surface">
					<div className="h-12 flex-shrink-0">
						<NavBar socket={socket} roomID={roomID} />
					</div>
					<div className="flex-1">
						<CodeEditor socket={socket} roomID={roomID} users={users} />
					</div>
				</div>

				<div className="flex gap-3">
					<div className="h-[16vh] w-1/2 rounded-xl border border-border bg-surface">
						<InputWindow socket={socket} roomID={roomID} />
					</div>
					<div className="h-[16vh] w-1/2 rounded-xl border border-border bg-surface">
						<OutputWindow />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CodeRoom;