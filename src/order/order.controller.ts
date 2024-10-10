import { Body, Controller, Headers, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import { JwtService } from '@nestjs/jwt';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,

    private jwtService: JwtService

  ) { }

  @Post()
  order(@Headers("token") token, @Body() model) {

    let decode = this.jwtService.decode(token);

    return this.ordersService.order(model, decode.userId)

  }

}


// nestjs