import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Comments from '@modules/users/infra/typeorm/entities/Comment';
import Tags from './Tags';
import Pictures from './Pictures';

export enum daysOfTheWeek {
  Sunday = 'sun',
  Monday = 'mon',
  Tuesday = 'tue',
  Wendnesday = 'wen',
  Thuesday = 'thu',
  Friday = 'fri',
  Saturday = 'sat',
}

@Entity('locals')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('time without time zone')
  openTime: Timestamp;

  @Column('time without time zone')
  closeTime: Timestamp;

  @Column('enum')
  openDays: daysOfTheWeek;

  @Column('money')
  price: number;

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

  @Column('decimal')
  rating: number;

  @ManyToMany(() => Tags, tags => tags.name, { eager: true })
  @JoinTable()
  tags: Tags[];

  @OneToMany(() => Pictures, pictures => pictures.local, { eager: true })
  picture: Pictures[];

  @ManyToMany(() => Comments, comments => comments.id, { eager: true })
  @JoinTable()
  comments: Comments[];

  @Column()
  rootOrNutella: boolean;

  @Column()
  showName: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
