import { Module } from '@nestjs/common';
import { AuthResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/user.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    AuthResolver,
    AuthsService,
    HttpExceptionFilter,
    JwtAccessStrategy,
    JwtService,
    JwtModule,
    JwtRefreshStrategy,
    UsersService,
  ],
})
export class AuthsModule {}
