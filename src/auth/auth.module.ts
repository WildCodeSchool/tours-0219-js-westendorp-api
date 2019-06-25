import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { authSchema } from './auth.schema';
import { MailerModule } from '@nest-modules/mailer';

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
    MailerModule.forRoot({
      transport: ({
        service: 'gmail',
        auth: {
          user: 'westen.dorp.wildcs@gmail.com',
          pass: 'transformer2019',
        },
      }),
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})

export class AuthModule { }
