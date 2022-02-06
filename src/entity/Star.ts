import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Star extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullName: string

  @Column('text')
  description: string

  @ManyToOne(type => User, {
    eager: true,
  })
  createdBy: User;

  @Column({ default: false })
  isPrivate: boolean = false;

  @CreateDateColumn()
  createdAt: Date;
}
