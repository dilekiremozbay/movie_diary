import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  type = "movie";

  @Column()
  title: string;

  @Column("text")
  description: string;

  @ManyToOne((type) => User, {
    eager: true,
  })
  createdBy: User;

  @Column({ default: false })
  isPrivate: boolean = false;

  @CreateDateColumn()
  createdAt: Date;

  likes: Like[];
  comments: Comment[];
}
