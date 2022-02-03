import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  firstName: string = "";

  @Column()
  lastName: string = "";

  @Column()
  username: string = "";

  @Column()
  password: string = "";

  @Column("json")
  security: {
    tokens: { _id: string; refreshToken: string; createdAt: Date }[];
  } = { tokens: [] };
}
