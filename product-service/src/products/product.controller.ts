import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dto/createProductDto';
import { filterProductDto } from './dto/filterProductDto';
import { MessagePattern } from "@nestjs/microservices";


@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @MessagePattern({ cmd: 'get_products' })
  async getProducts(filterProductDTO: filterProductDto) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts =
        await this.productService.getFilteredProducts(filterProductDTO);
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @MessagePattern({ cmd: 'get_product' })
  async getProduct(id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @MessagePattern({ cmd: 'increment_quantity' })
  async addQuantity(id: string) { 
    const product = await this.productService.addQuantity(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @MessagePattern({ cmd: 'decrement_quantity' })
  async reduceQuantity(id: string) { 
    const product = await this.productService.reduceQuantity(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }


  @MessagePattern({ cmd: 'add_product' })
  async addProduct(createProductDTO: createProductDto) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @MessagePattern({ cmd: 'update_product' })
  async updateProduct(
    id: string,
    createProductDTO: createProductDto,
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @MessagePattern({ cmd: 'delete_product' })
  async deleteProduct(id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}
