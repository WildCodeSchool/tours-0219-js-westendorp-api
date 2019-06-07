import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { authSchema } from './auth.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeature([{
      name: 'authentication', schema: authSchema,
      collection: 'authentication',
    }]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})

export class AuthModule { }
