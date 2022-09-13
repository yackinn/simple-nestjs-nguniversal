import {
  BaseEntity as TypeormBaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
}               from 'typeorm';
import { UUID } from './types/utility.types';

@Entity()
export abstract class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}



