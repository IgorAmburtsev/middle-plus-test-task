import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Chat } from './chat.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  usertag: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats: Chat[];
}