import _ from "lodash";
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

  @Column()
  photos: string = "";

  static async makeUsernameUnique(username: string) {
    let currentUsername = username;

    for (;;) {
      console.log("check username existence:", currentUsername);

      const user = await User.findOne({
        where: {
          username: currentUsername,
        },
      });

      if (!user) {
        return currentUsername;
      }

      currentUsername = username + _.random(1, 1000);
    }
  }
}
