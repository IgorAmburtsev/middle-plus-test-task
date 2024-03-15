export interface user {
	uuid: string;
	username: string;
	usertag: string;
	password: string;
	chats: object;
}

export interface userLogin {
	username: string;
	password: string;
}
