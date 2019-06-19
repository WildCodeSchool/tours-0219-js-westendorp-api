import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Model } from 'mongoose';
import { Authentication } from './authentication';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationCreateDTO } from './authentication.dto';
import { MailerService } from '@nest-modules/mailer';
import { AuthenticationPassDTO } from './authenticationreset.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('authentication')
    private readonly authenticationModel: Model<Authentication>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signIn(mail: string): Promise<any> {
    const partner: JwtPayload = { email: mail };
    return { token: this.jwtService.sign(partner) };
  }

  async signUp(user: AuthenticationCreateDTO): Promise<any> {
    const userCreated = new this.authenticationModel(user);
    return await userCreated.save();
  }

  async validateMail(payload: JwtPayload): Promise<any> {
    return await this.authenticationModel.findOne({ email: payload.email });
  }

  async validatePassword(partner: AuthenticationCreateDTO): Promise<any> {
    const userFinding = await this.authenticationModel
      .findOne({ email: partner.email })
      .exec();
    if (userFinding.password !== partner.password) {
      throw new UnauthorizedException();
    } else {
      return userFinding;
    }
  }

  async update(id: string, authModel: AuthenticationCreateDTO) {
    const user = await this.authenticationModel.findByIdAndUpdate(
      id,
      authModel,
      {
        new: true,
      },
    );
    if (!user) {
      throw new HttpException(
        'The request is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async updatePassword(authModel: AuthenticationPassDTO) {
    const user = await this.authenticationModel.findOne();
    console.log(user);
    await this.authenticationModel.findByIdAndUpdate(
      user.id,
      { password: authModel.password },
      {       new: true,
      },
    ).exec();

    if (!user) {
      throw new HttpException(
        'The request is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
