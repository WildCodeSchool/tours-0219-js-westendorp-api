import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Model } from 'mongoose';
import { Authentication } from './authentication';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationCreateDTO } from './authentication.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('authentication')
              private readonly authenticationModel:Model<Authentication>, 
              private readonly jwtService: JwtService)
   {}

  async signIn(email: string) {
    const user: JwtPayload = {
      email: 'test@email.com',
    };
    const accessToken = this.jwtService.sign(user);
    return {
      accessToken,
      expiresIn: 3600,
    };
  }

  async validateMail(payload: JwtPayload): Promise<any> {
    return await this.authenticationModel.findOne({ user: payload.email });
  }

  async validatePassword(partner: AuthenticationCreateDTO): Promise<any> {
    const userFinding = await this.authenticationModel.findOne({ email: partner.email });
    if (userFinding.password !== partner.password) {
      throw new UnauthorizedException();
    } else {
      return userFinding;
    }
  }
}
