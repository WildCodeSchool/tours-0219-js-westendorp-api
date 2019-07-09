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
import { AuthenticationCreateDTO } from './authentication.dto.create';
import { AuthenticationPassDTO } from './authentication.dto.reset';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('authentication')
    private readonly authenticationModel: Model<Authentication>,
    private readonly jwtService: JwtService,
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
    if (!bcrypt.compareSync(partner.password, userFinding.password)) {
      throw new UnauthorizedException();
    }
    return userFinding;
  }

  async update(email: string, authModel: AuthenticationCreateDTO) {
    const user = await this.authenticationModel.findOneAndUpdate(
      email,
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
    await this.authenticationModel.findByIdAndUpdate(
      user.id,
      { password: authModel.password },
      {
        new: true,
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

  async validateeMail(findem: AuthenticationCreateDTO): Promise<any> {
    const emailFinding = await this.authenticationModel
      .findOne({ email: findem.email })
      .exec();
    if (emailFinding.email !== findem.email) {
      throw new UnauthorizedException();
    } else {
      return emailFinding;
    }
  }
}
