import { Controller, UseGuards, Post, Body, Get, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationCreateDTO } from './authentication.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  async signin(@Body() authenticationCreateDTO: AuthenticationCreateDTO) {
    await this.authService.validatePassword(authenticationCreateDTO);
    return this.authService.signIn(authenticationCreateDTO.email);
  }

  @Post('signup')
  async signup(@Body() authenticationCreateDTO: AuthenticationCreateDTO) {
    await this.authService.signUp(authenticationCreateDTO);
  }

  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() authDTO: AuthenticationCreateDTO) {
    return await this.authService.update(id, authDTO);
  }
}
