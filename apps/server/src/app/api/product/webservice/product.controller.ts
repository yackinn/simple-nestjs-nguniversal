import { Controller, Get } from '@nestjs/common';
import { ProductService }  from '../product.service';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Get a Search Result of Anschlussobjekte
   */
  // @Get()
  // async getByUserId(
  //   @SessionUser() user: User,
  //   @ParamSearchManyOptions() searchManyOptions: SearchManyOptions<Product>
  // ): Promise<AnschlussobjektSearchResponse> {
  //   const entities = await this.anschlussobjektService.findBy(searchManyOptions);
  //
  //   return toResponse(AnschlussobjektSearchResponse, entities);
  // }
  //
  // /**
  //  * Get an Anschlussobjekt by id
  //  */
  // @Get(':id')
  // async getOne(
  //   @ParamSearchOptions() searchOptions: SearchOptions<Product>,
  //   @ParamId() id: Id
  // ): Promise<AnschlussobjektResponse> {
  //   const entity = await this.anschlussobjektService.findOneBy({
  //     ...searchOptions,
  //     where: { ...searchOptions.where, id },
  //   });
  //
  //   return toResponse(AnschlussobjektResponse, entity);
  // }
  //
  // /**
  //  * Create an Anschlussobjekt
  //  */
  // @Post()
  // async create(
  //   @Body() createAnschlussobjektDto: CreateProductDto,
  //   @SessionAppId() appId: UUID
  // ): Promise<AnschlussobjektResponse> {
  //   const entity = this.anschlussobjektService.create(createAnschlussobjektDto, appId);
  //
  //   return toResponse(AnschlussobjektResponse, entity);
  // }
  //
  // /**
  //  * Update an Anschlussobjekt by id
  //  */
  // @Patch(':id')
  // async update(
  //   @Body() updateAnschlussobjektDto: UpdateAnschlussobjektDto,
  //   @ParamId() id: Id
  // ): Promise<AnschlussobjektResponse> {
  //   const entity = this.anschlussobjektService.update(id, updateAnschlussobjektDto);
  //
  //   return toResponse(AnschlussobjektResponse, entity);
  // }
}
