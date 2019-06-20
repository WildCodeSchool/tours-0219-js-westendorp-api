import { Controller, UseGuards, Post, Body, Get, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationCreateDTO } from './authentication.dto';
import { MailerService } from '@nest-modules/mailer';
import { AuthenticationPassDTO } from './authenticationreset.dto';
import { combineLatest } from 'rxjs';
import { JwtPayload } from 'dist/auth/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly mailerService: MailerService) { }

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

  @Post('validemail')
  async validemail(@Body() authenticationCreateDTO: AuthenticationCreateDTO) {
    const emailfind = await this.authService.validateeMail(authenticationCreateDTO);
    if (emailfind) {
      return true;
    }
    return false;
  }

  @Post('forget')
  async forgetPassword() {
    function randomPassword(length) {
      const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
      let pass = '';
      for (let x = 0; x < length; x += 1) {
        const i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
      }
      return pass;
    }
    const newPass = randomPassword(6);
    const user = new AuthenticationPassDTO(newPass);

    console.log(user);
    await this.authService.updatePassword(user);
    await this
    .mailerService
    .sendMail({
      to: 'felixok7@gmail.com', // sender address
      from: 'westen.dorp.wildcs@gmail.com', // list of receivers
      subject: 'Réinitialisation du mot de passe', // Subject line
      text: '', // plaintext body
      html: `<b>Vous avez demandé la réinitialisation de votre mot de passe.<br>
       Veuillez trouver ci-joint votre nouveau mot de passe : ${newPass}</b>`, // HTML body content
    })
    .then(() => {})
    .catch(() => {}) ;
  }
}
