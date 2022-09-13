// todo check how to use as swagger auto detected response
import { Type }      from '@nestjs/common';
import { ApiExpose } from '../api-expose.decorator';

export interface ISearchResult<T> {
  pageCount: number;
  currentPage: number;
  total: number;
  take: number;
  links: SearchResultLinks | null;
  elementsCount: number;
  elements: T[];
}

export function GenericSearchResult<T>(elementType: Type<T>): Type<ISearchResult<T>> {
  class SearchResult implements ISearchResult<T> {
    @ApiExpose()
    total: number;

    @ApiExpose()
    pageCount: number;

    @ApiExpose()
    currentPage: number;

    @ApiExpose()
    take: number;

    @ApiExpose()
    elementsCount: number;

    @ApiExpose(() => elementType, { isArray: true })
    elements: T[];

    @ApiExpose(() => SearchResultLinks)
    links: SearchResultLinks | null;
  }

  return SearchResult;
}

export class SearchResultLinks {
  @ApiExpose()
  first: string;

  @ApiExpose()
  previous: string | null;

  @ApiExpose()
  next: string | null;

  @ApiExpose()
  last: string;
}
