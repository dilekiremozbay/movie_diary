import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  entityId: number;

  @Column()
  entityType: 'artist' | 'movie';
}
