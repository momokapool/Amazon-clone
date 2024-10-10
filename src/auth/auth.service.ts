import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(user) {

        let { email, password } = user

        // check mail trùng

        let checkUser = await this.prismaService.users.findFirst({
            where: {
                email,
                password
            }
        })

        if (checkUser) {
            let token = this.jwtService.sign({ userId: checkUser.user_id }, {
                expiresIn: "1d",
                secret: "BI_MAT"
            })
            return token
        } else {
            return "Sai email, pass"
        }

    }

    async signUp(user) {

        let { full_name, email, password } = user

        // check mail trùng

        let checkEmail = await this.prismaService.users.findFirst({
            where: {
                email
            }
        })

        if (checkEmail) {
            return "Email đã tồn tại"
        }

        let newUser = {
            full_name,
            email,
            password
        }

        await this.prismaService.users.create({
            data: newUser
        })

        return "Đăng ký thành công"

    }
}