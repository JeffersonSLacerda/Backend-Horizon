import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Local from './Local';

@Entity('operations')
class Operations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column('time without time zone')
  openTime: Timestamp;

  @Column('time without time zone')
  closeTime: Timestamp;

  @Column('money')
  price: number;

  @ManyToOne(() => Local, local => local.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  local: Local;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Operations;
