import { DeepPartial } from "typeorm";
import { Chat } from "@entities/chat.entity";
export class UserDto {
  usertag: string;
  username: string;
  password: string;
  chats: DeepPartial<Chat>[];
}