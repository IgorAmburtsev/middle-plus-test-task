import { Chat } from "@entities/chat.entity";
import { DeepPartial } from "typeorm";

export class MessageDto {
  id: number;
  chatId: number;
  userTo: string;
  userFrom: string;
  messageText: string;
  createdDate: Date;
  updatedDate: Date;
}
