export class MessageDto {
  chatId: number;
  userTo: string;
  userFrom: string;
  messageText: string;
  createdDate: Date;
  updatedDate: Date;
}
