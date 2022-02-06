import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
}
