import { Logger, NotFoundException, Type }                             from '@nestjs/common';
import { EntityManager, EntityMetadata, QueryFailedError, Repository } from 'typeorm';
import { ObjectLiteral }                                               from 'typeorm/common/ObjectLiteral';
import {
  QueryDeepPartialEntity
}                                                                      from 'typeorm/query-builder/QueryPartialEntity';
import { Id }                                                          from '../types/utility.types';

export abstract class BaseRepository<Entity extends ObjectLiteral,
  UpdateDto extends QueryDeepPartialEntity<Entity>> extends Repository<Entity> {
  protected logger: Logger;
  protected entityType: Type<Entity>;

  async updateEntityOrFail(id: Id, updateDto: UpdateDto): Promise<Entity> {
    const result = await this.createQueryBuilder()
      .update(updateDto)
      .where({ id })
      .returning('*')
      .execute();

    if (result.affected === 0) throw new NotFoundException();

    return result.raw[0];
  }

  async transact<T>(
    task: (tm: EntityManager) => T,
    onError?: (error: QueryFailedError) => void
  ): Promise<T | undefined> {
    return await this.manager.transaction(async (transactionManager) => {
      try {
        return task(transactionManager);
      } catch (err: any) {
        this.logger.error(err);
        if (onError) onError(err);
      }
    });
  }

  private get entityMetadata(): EntityMetadata {
    return this.manager.connection.getMetadata(this.entityType);
  }
}
