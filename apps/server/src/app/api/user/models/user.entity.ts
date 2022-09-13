// admin or driving school owner
import { Column, Entity } from 'typeorm';
import { BaseEntity }     from '../../../shared/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column()
  password: string;
}
