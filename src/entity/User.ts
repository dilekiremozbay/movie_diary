import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index({
    unique: true,
  })
  @Column()
  username: string = "";

  @Column()
  password: string = "";

  @Index({
    unique: true,
  })
  @Column()
  email: string = "";

  @Column("json")
  security: {
    tokens: { _id: string; refreshToken: string; createdAt: Date }[];
  } = { tokens: [] };
}
