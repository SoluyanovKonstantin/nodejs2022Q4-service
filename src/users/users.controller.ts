import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UpdatePasswordDto, User, UserDto } from './user.interface';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

const users: User[] = [];

@ApiTags('user')
@Controller('user')
export class UsersController {
    @Get()
    getUsers(): User[] {
        return users;
    }

    @ApiParam({ name: 'id' })
    @Get(':id')
    getUser(@Param() id: string): User {
        return users.find((user) => user.id === id);
    }

    @Post()
    async createUser(@Body() userDto: UserDto) {
        const userToDB: User = {
            id: uuid(),
            login: userDto.login,
            password: userDto.password,
            version: 0,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };

        users.push(userToDB);
        return;
    }

    @Put(':id')
    updateUserPassword(
        @Param() id: string,
        @Body() body: UpdatePasswordDto,
    ): User {
        const newUser = users.find((user) => user.id === id);
        if (!newUser) {
            throw new HttpException(
                'user does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (newUser.password === body.oldPassword) {
            newUser.password = body.newPassword;
            return newUser;
        } else {
            throw new HttpException('wrong password', HttpStatus.FORBIDDEN);
        }
    }

    @Delete(':id')
    deleteUser(@Param() id: string) {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new HttpException(
                'user does not exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        users.splice(index, 1);
    }
}
