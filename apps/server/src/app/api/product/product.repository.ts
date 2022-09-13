import { Logger }           from '@nestjs/common';
import { BaseRepository }   from '../../shared/orm/base.repository';
import { CustomRepository } from '../../shared/orm/custom-repository.decorator';
import { Product }          from './models/product.entity';
import { UpdateProductDto } from './webservice/dto/product.dtos';

@CustomRepository(Product)
export class ProductRepository extends BaseRepository<Product,
  UpdateProductDto> {
  protected override logger     = new Logger(ProductRepository.name);
  protected override entityType = Product;
}
