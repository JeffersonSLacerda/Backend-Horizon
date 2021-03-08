import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Comments from '@modules/users/infra/typeorm/entities/Comment';
import Operations from './Operations';
import Picture from './Pictures';
import Tags from './Tags';

type status = 'ok' | 'waiting' | 'refused';

@Entity('locals')
class Locals {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @ManyToOne(() => User, local => local.locals, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column('decimal')
  rating: number;

  @ManyToMany(() => Tags, { eager: true })
  @JoinTable()
  tags: Tags[];

  @OneToMany(() => Picture, pictures => pictures.local, {
    eager: true,
  })
  @JoinColumn()
  picture: Picture[];

  @ManyToMany(() => Comments, { eager: true })
  @JoinTable()
  comments?: Comments[];

  @Column()
  rootOrNutella: boolean;

  @Column()
  showName: boolean;

  @OneToMany(() => Operations, operations => operations.local, { eager: true })
  @JoinColumn()
  operations: Operations[];

  @Column()
  status: status;

  @Column()
  link?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Locals;
