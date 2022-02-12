import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne((type) => User, {
    eager: true,
  })
  user: User;

  @Column()
  entityId: number;

  @Column()
  entityType: "star" | "movie";
}
