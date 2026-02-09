
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './models/products.schema';
import { createProductDto } from './dto/createProductDto';
import { filterProductDto } from './dto/filterProductDto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getFilteredProducts(
    filterProductDTO: filterProductDto,
  ): Promise<Product[]> {
    const { category, search } = filterProductDTO;

    const query: any = {};

    if (category) {
      query.product_category = category;
    }

    if (search) {
      query.$or = [
        { product_name: { $regex: search, $options: 'i' } },
        { product_description: { $regex: search, $options: 'i' } },
      ];
    }

    return this.productModel.find(query).exec();
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  async addProduct(createProductDto: createProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDto);
    return newProduct.save();
  }

  async updateProduct(
    id: string,
    createProductDto: createProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      createProductDto,
      { new: true },
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return updatedProduct;
  }

  async addQuantity(
    id:string
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $inc: { stock_quantity: 1 } },
      { new: true },
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return updatedProduct;
  }

  async reduceQuantity(
    id:string
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $inc: { stock_quantity: -1 } },
      { new: true },
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}
