import { Module }            from '@nestjs/common';
import { BaseTypeormModule } from '../../shared/orm/base-typeorm.module';
import { ProductService }    from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './webservice/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    BaseTypeormModule.forCustomRepository([ProductRepository]),
    ProductModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
