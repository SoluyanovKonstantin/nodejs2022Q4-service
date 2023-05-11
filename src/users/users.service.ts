import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const users: User[] = [];

@Injectable()
export class UsersService {
    createUser(userDto: CreateUserDto) {
        const userToDB: User = {
            id: uuid(),
            login: userDto.login,
            password: userDto.password,
            version: 1,
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

    updateUserPassword(updatePasswordDto: UpdateUserDto, id: string) {
        const newUser = users.find((user) => user.id === id);
        if (!newUser) {
            throw new HttpException(`user doesn't exist`, HttpStatus.NOT_FOUND);
        }
        if (newUser.password === updatePasswordDto.oldPassword) {
            newUser.version++;
            newUser.updatedAt = new Date().getTime();
            newUser.password = updatePasswordDto.newPassword;
            return newUser;
        } else {
            throw new HttpException('wrong password', HttpStatus.FORBIDDEN);
        }
    }

    deleteUser(id: string) {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new HttpException(`user doesn't exist`, HttpStatus.NOT_FOUND);
        }

        users.splice(index, 1);
    }
}
