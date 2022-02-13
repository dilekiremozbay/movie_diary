import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class SocialLoginCredentials extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column()
  provider: string;

  @Column()
  subject: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;
}
