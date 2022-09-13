import { IsNumber, IsOptional } from 'class-validator';
import { ObjectLiteral }        from 'typeorm/common/ObjectLiteral';
import { SearchOptions }        from './find-query.model';

export class SearchManyOptions<Entity extends ObjectLiteral = any> extends SearchOptions {
  @IsNumber()
  @IsOptional()
  take?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
