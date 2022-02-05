import { text } from "stream/consumers";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { User } from "../entity/User";

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string = "";

  @Column()
  title: string = "";

  @Column("text")
  description: string = "";

  @Column()
  image: string = "";

  // @ManyToOne(() => User, (user) => user.photos)
  // user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "date", nullable: true })
  skid: Date;
}
//export class Photo extends BaseEntity {
