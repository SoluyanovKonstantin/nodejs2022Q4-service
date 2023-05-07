import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersInterceptor } from 'src/users.interceptor';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        { provide: APP_INTERCEPTOR, useClass: UsersInterceptor },
    ],
})
export class UsersModule {}
