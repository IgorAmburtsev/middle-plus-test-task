export interface user {
  [key: string]: any;
  uuid: string;
  username: string;
  usertag: string;
  chats: object;
}

export interface userLogin {
  username: string;
  password: string;
}

export interface userRegister {
  username: string;
  usertag: string;
  password: string;
}

export interface chats {
  [key: string]: any;
  chatId: number;
  chatName: string;
  users: object[];
}

export interface chatInstance {
  chatId: number;
  chatName: string;
  users: [
    {
      usertag: string;
      username: string;
    }
  ];
}

export type ChatList = chats[];