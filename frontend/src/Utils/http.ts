import axios from "axios";

const baseUrl = "http://localhost:9494";

export const axiosInstance = axios.create({
	baseURL: baseUrl,
    withCredentials: true,
	headers: {
		"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
	},
});
