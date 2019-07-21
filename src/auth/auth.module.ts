import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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
      secretOrPrivateKey: process.env.SECRET_KEY,
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
          user: process.env.MAILER_SENDER,
          pass: process.env.MAILER_PASSWORD,
        },
      }),
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})

export class AuthModule { }
