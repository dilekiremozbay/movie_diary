import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, {
    eager: true,
  })
  createdBy: User;

  @Column()
  likes_count: number;

  @Column()
  entityId: number;

  @Column()
  entityType: "star" | "movie";
}
