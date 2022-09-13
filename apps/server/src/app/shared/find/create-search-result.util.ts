import { Type }              from '@nestjs/common';
import { Repository }        from 'typeorm';
import { ObjectLiteral }     from 'typeorm/common/ObjectLiteral';
import { FindManyOptions }   from 'typeorm/find-options/FindManyOptions';
import { Route }             from '../types/with-route.type';
import { SearchManyOptions } from './search-query.model';
import { ISearchResult }     from './search-result.type';

type CreateSearchResultOptions<Entity> = FindManyOptions<Entity> & SearchManyOptions & Route;

export async function createSearchResult<Entity extends ObjectLiteral,
  TargetEntity extends Type,
  P extends string = never>(
  repository: Repository<Entity>,
  options: CreateSearchResultOptions<Entity> = {}
): Promise<ISearchResult<Entity>> {
  let { take = 20, page = 1, route } = options;

  page       = page >= 1 ? page : 1;
  const skip = (page - 1) * take;

  const [collection, total] = await repository.findAndCount({ ...options, take, skip });

  const pageCount    = Math.ceil(total / take);
  const currentPage  = page;
  const previousPage = page - 1;
  const nextPage     = page + 1;

  return {
    total,
    pageCount,
    currentPage,
    take,
    elementsCount: collection.length,
    elements: collection,
    links: route
      ? {
        first: `${route}?page=1&take=${take}`,
        previous: previousPage > 0 ? `${route}?page=${previousPage}&take=${take}` : null,
        next: nextPage <= pageCount ? `${route}?page=${nextPage}&take=${take}` : null,
        last: `${route}?page=${pageCount}&take=${take}`,
      }
      : null,
  };
}
