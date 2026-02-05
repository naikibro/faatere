import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserRole } from '@shared/src/enums';
import { Tomite } from './tomite.entity';
import { Member } from './member.entity';
import { Invitation } from './invitation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('idx_users_email', { unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SECRETARY,
  })
  role!: UserRole;

  @Column({ type: 'uuid', name: 'tomite_id', nullable: true })
  tomiteId!: string | null;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ type: 'uuid', name: 'member_id', nullable: true })
  memberId!: string | null;

  @Column({ type: 'uuid', name: 'invited_by', nullable: true })
  invitedBy!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => Tomite, (tomite) => tomite.users, { nullable: true })
  @JoinColumn({ name: 'tomite_id' })
  tomite!: Tomite | null;

  @OneToOne(() => Member, (member) => member.user, { nullable: true })
  @JoinColumn({ name: 'member_id' })
  member!: Member | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'invited_by' })
  inviter!: User | null;

  @OneToMany(() => User, (user) => user.inviter)
  invitedUsers!: User[];

  @OneToMany(() => Invitation, (invitation) => invitation.createdByUser)
  createdInvitations!: Invitation[];

  @OneToMany(() => Member, (member) => member.createdByUser)
  createdMembers!: Member[];
}
