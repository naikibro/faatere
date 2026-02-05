import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Member } from './member.entity';
import { Invitation } from './invitation.entity';

@Entity('tomites')
export class Tomite {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('idx_tomites_code', { unique: true })
  @Column({ type: 'varchar', length: 4, unique: true })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relations
  @OneToMany(() => User, (user) => user.tomite)
  users!: User[];

  @OneToMany(() => Member, (member) => member.tomite)
  members!: Member[];

  @OneToMany(() => Member, (member) => member.originalTomite)
  originalMembers!: Member[];

  @OneToMany(() => Invitation, (invitation) => invitation.tomite)
  invitations!: Invitation[];
}
