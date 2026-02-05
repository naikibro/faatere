import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { PaymentMethod } from '@shared/src/enums';
import { Tomite } from './tomite.entity';
import { User } from './user.entity';

@Entity('members')
@Index('idx_members_tomite', ['tomiteId'])
@Index('idx_members_search', ['firstName', 'lastName'])
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate!: Date;

  @Column({ type: 'varchar', length: 255, name: 'birth_place' })
  birthPlace!: string;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 500, name: 'photo_url', nullable: true })
  photoUrl!: string | null;

  @Index('idx_members_number', { unique: true })
  @Column({
    type: 'varchar',
    length: 50,
    name: 'member_number',
    unique: true,
  })
  memberNumber!: string;

  @Column({ type: 'date', name: 'membership_date' })
  membershipDate!: Date;

  @Column({ type: 'uuid', name: 'tomite_id' })
  tomiteId!: string;

  @Column({ type: 'uuid', name: 'original_tomite_id' })
  originalTomiteId!: string;

  @Column({ type: 'boolean', name: 'has_paid', default: false })
  hasPaid!: boolean;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    name: 'payment_method',
    nullable: true,
  })
  paymentMethod!: PaymentMethod | null;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => Tomite, (tomite) => tomite.members)
  @JoinColumn({ name: 'tomite_id' })
  tomite!: Tomite;

  @ManyToOne(() => Tomite, (tomite) => tomite.originalMembers)
  @JoinColumn({ name: 'original_tomite_id' })
  originalTomite!: Tomite;

  @OneToOne(() => User, (user) => user.member, { nullable: true })
  user!: User | null;

  @ManyToOne(() => User, (user) => user.createdMembers)
  @JoinColumn({ name: 'created_by' })
  createdByUser!: User;
}
