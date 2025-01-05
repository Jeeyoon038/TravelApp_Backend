// src/auth/google-user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GoogleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  googleId: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture?: string;
}