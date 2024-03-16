import axios from "axios";
import { io } from "socket.io-client";

const baseUrl = "http://localhost:9494";

export const axiosInstance = axios.create({
	baseURL: baseUrl,
    withCredentials: true,
	headers: {
		"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
	},
});

export const socket = io(baseUrl, {
	autoConnect: true,
	transports: ["websocket"],
	reconnection: true,
})