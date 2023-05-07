import { UpdatePasswordDto, User, UserDto } from './user.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

const users: User[] = [];

@Injectable()
export class UsersService {
    createUser(userDto: UserDto) {
        const userToDB: User = {
            id: uuid(),
            login: userDto.login,
            password: userDto.password,
            version: 0,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };

        users.push(userToDB);

        return userToDB;
    }

    getUsers() {
        return users;
    }

    getUser(id: string) {
        const user = users.find((user) => user.id === id);
        if (!user) {
            throw new HttpException(`user doesn't find`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    updateUserPassword(updatePasswordDto: UpdatePasswordDto, id: string) {
        const newUser = users.find((user) => user.id === id);
        if (!newUser) {
            throw new HttpException(
                `user doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        if (newUser.password === updatePasswordDto.oldPassword) {
            newUser.password = updatePasswordDto.newPassword;
            return newUser;
        } else {
            throw new HttpException('wrong password', HttpStatus.FORBIDDEN);
        }
    }

    deleteUser(id: string) {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new HttpException(
                `user doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        users.splice(index, 1);
    }
}
