import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {

    constructor(
        private prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache

    ) { }

    async getProduct() {

        //  code bthg
        // let data = await this.prismaService.product.findMany()
        // return data;


        //code co cache
        const cachedata = await this.cacheManager.get("demo")

        if (cachedata) {
            return cachedata
        } else {
            const data = await this.prismaService.product.findMany()
            await this.cacheManager.set("demo", data)
            return data
        }
    }

    async getCategory() {

        let data = await this.prismaService.category.findMany()
        return data;
    }

    async getProductType(categoryId) {

        let data = await this.prismaService.product.findMany({
            where: {
                category_id: categoryId
            }
        })
        return data;
    }



    async getSearch(name, page) {

        let index = (page - 1) * 5;

        let data = await this.prismaService.product.findMany({
            where: {
                product_name: {
                    contains: name
                }
            },
            skip: index,
            take: 5
        })
        return data;
    }
}