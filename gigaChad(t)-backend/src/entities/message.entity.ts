import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  chatId: number;

  @Column({ type: 'varchar', nullable: false })
  userTo: string;

  @Column({ type: 'varchar', nullable: false })
  userFrom: string;

  @Column({ type: 'varchar', nullable: false })
  messageText: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedDate: Date;
}
