import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'json', nullable: true })
  chats: object;
}
