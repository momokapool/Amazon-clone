import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrdersService {


    constructor(
        private prismaService: PrismaService
    ) { }


    async order(model, user_id) {

        // order => lưu thông tin đơn hàng
        let newOrder = {
            user_id: user_id,
            list_product: JSON.parse(model.list_product),
            create_at: new Date()
        }
        let orderSuccess = await this.prismaService.orders.create({ data: newOrder })


        // notify => gửi mail thông báo cho user
        let configMail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sangrom2003@gmail.com",
                pass: "vzgvpxxqfjynrwfy"
            }
        })

        let infoMail = {
            from: "sangrom2003@gmail.com",
            to: model.email, // "khaitruong2112@gmail.com"
            subject: "Đặt hàng qua Amazon",
            html: "<h1> Xác nhận đợn hàng thành công </h1>"
        }

        configMail.sendMail(infoMail, error => error);

        // ship => lưu thông tin shipping

        let newShip = {
            order_id: orderSuccess.order_id,
            full_name: model.full_name,
            email: model.email,
            phone: model.phone,
            address: model.address,
            create_at: new Date()
        }
        await this.prismaService.shipping.create({ data: newShip })

        // payment => lưu thông tin thanh toán

        return "Thành công";
    }
}
