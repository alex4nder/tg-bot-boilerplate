import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  telegramId: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: "ctime", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "mtime", type: "timestamp" })
  updatedAt: Date;
}
