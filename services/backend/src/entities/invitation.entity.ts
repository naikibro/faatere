import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { InvitationRole } from '@shared/src/enums';
import { Tomite } from './tomite.entity';
import { User } from './user.entity';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Index('idx_invitations_token', { unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  token!: string;

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt!: Date;

  @Column({
    type: 'enum',
    enum: InvitationRole,
    enumName: 'invitation_role_enum',
  })
  role!: InvitationRole;

  @Column({ type: 'uuid', name: 'tomite_id' })
  tomiteId!: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy!: string;

  @Column({ type: 'timestamp', name: 'used_at', nullable: true })
  usedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relations
  @ManyToOne(() => Tomite, (tomite) => tomite.invitations)
  @JoinColumn({ name: 'tomite_id' })
  tomite!: Tomite;

  @ManyToOne(() => User, (user) => user.createdInvitations)
  @JoinColumn({ name: 'created_by' })
  createdByUser!: User;
}
