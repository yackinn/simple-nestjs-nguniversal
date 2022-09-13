import { Injectable, UseGuards }               from '@nestjs/common';
import { FindOneOptions }     from 'typeorm/find-options/FindOneOptions';
import { createSearchResult } from '../../shared/find/create-search-result.util';
import { SearchManyOptions }  from '../../shared/find/search-query.model';
import { ISearchResult }      from '../../shared/find/search-result.type';
import { Id }                 from '../../shared/types/utility.types';
import { SessionGuard }       from '../auth/guards/session.guard';
import { Product }                             from './models/product.entity';
import { ProductRepository }                   from './product.repository';
import { CreateProductDto, UpdateProductDto, } from './webservice/dto/product.dtos';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async findBy(
    options: SearchManyOptions<Product>
  ): Promise<ISearchResult<Product>> {
    return createSearchResult(this.productRepository, options);
  }

  async findOneBy(findOneOptions: FindOneOptions<Product>): Promise<Product> {
    return this.productRepository.findOneOrFail(findOneOptions);
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const entity = this.productRepository.create(createProductDto);
    await this.productRepository.save(entity);

    return entity;
  }

  async update(
    id: Id,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productRepository.updateEntityOrFail(id, updateProductDto);
  }

  async remove(id: Id): Promise<void> {
    await this.productRepository.delete(id);
  }
}
