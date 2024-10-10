import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get("/get-all")
  getProduct() {
    return this.productService.getProduct()
  }


  @Get("/get-category")
  getCategory() {
    return this.productService.getCategory()
  }

  @Get("/get-product-type/:categoryId")
  getProductType(@Param("categoryId") categoryId) {
    return this.productService.getProductType(categoryId)
  }

  @Get("/search-pagination")
  getSearch(@Query("name") name, @Query("page") page) {

    return this.productService.getSearch(name, page)
  }


}