import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Column({ type: 'varchar', nullable: false })
  userTo: string;

  @Column({ type: 'varchar', nullable: false })
  userFrom: string;

  @Column({ type: 'varchar', nullable: true })
  edited: boolean;

  @Column({ type: 'varchar', nullable: false })
  messageText: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedDate: Date;
}
