import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthenticationCreateDTO } from './authentication.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
   async signin(@Body() authenticationCreateDTO: AuthenticationCreateDTO) {
    await this.authService.validatePassword(authenticationCreateDTO);
    return this.authService.signIn(authenticationCreateDTO.email);
  }
}
