import { Controller, UseGuards, Post, Body, Get, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationCreateDTO } from './authentication.dto.create';
import { MailerService } from '@nest-modules/mailer';
import { AuthenticationPassDTO } from './authentication.dto.reset';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService) { }

  @Put(':email')
  @UseGuards(AuthGuard())
  async updateUserPassword(
    @Param('email') email: string,
    @Body() authDTO: AuthenticationCreateDTO) {
    return await this.authService.update(email, authDTO);
  }

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
  async updatePassword(@Param('id') id: string, @Body() authDTO: AuthenticationCreateDTO) {
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
    await this.authService.updatePassword(user);
    await this
      .mailerService
      .sendMail({
        to: 'felixok7@gmail.com', // sender address
        from: 'westen.dorp.wildcs@gmail.com', // list of receivers
        subject: 'Réinitialisation du mot de passe', // Subject line
        text: '', // plaintext body
        html: `<b>Vous avez demandé la réinitialisation de votre mot de passe.<br>
       Veuillez trouver ci-joint votre nouveau mot de passe : ${newPass}
       Vous pourrez le modifier dans la partie administrateur puis dans "Mon Compte".
       </b>`, // HTML body content
      })
      .then(() => { })
      .catch(() => { });
  }
}
