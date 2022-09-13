import { ApiExpose }           from '../../../../shared/api-expose.decorator';
import { GenericSearchResult } from '../../../../shared/find/search-result.type';

export class ProductResponse {
  @ApiExpose()
  id: string;
}

export class ProductSearchResponse extends GenericSearchResult(ProductResponse) {}
