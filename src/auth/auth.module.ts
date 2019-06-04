import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategie';
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
    MongooseModule.forFeature([{ name: 'authentication', schema: authSchema }]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})

export class AuthModule {}
