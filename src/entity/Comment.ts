import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  @ManyToOne(type => User)
  user: User;

  @Column()
  entityId: number;

  @Column()
  entityType: 'artist' | 'movie';
}
