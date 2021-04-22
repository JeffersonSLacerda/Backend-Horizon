import { Exclude } from 'class-transformer';

import Locals from '@modules/locals/infra/typeorm/entities/Local';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Profile from './Profile';

import Comment from './Comment';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @OneToMany(() => Locals, local => local.user)
  locals: Locals[];

  @ManyToOne(() => Profile, profile => profile.type, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  profile: Profile;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @Column('boolean')
  isAtivo: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
