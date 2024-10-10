import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() user) {
    return this.authService.login(user)
  }

  @Post("/sign-up")
  signUp(@Body() user) {
    return this.authService.signUp(user)
  }
}