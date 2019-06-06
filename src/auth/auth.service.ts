import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Model } from 'mongoose';
import { Authentication } from './authentication';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationCreateDTO } from './authentication.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('authentication')
    private readonly authenticationModel: Model<Authentication>,
    private readonly jwtService: JwtService) { }

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
    const userFinding = await this.authenticationModel.findOne({ email: partner.email }).exec();
    if (userFinding.password !== partner.password) {
      throw new UnauthorizedException();
    } else {
      return userFinding;
    }
  }
}
