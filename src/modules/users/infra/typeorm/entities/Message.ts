import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import User from './User';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column('text')
  text: string;

  @ManyToOne(() => User, user => user.id, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Message;
