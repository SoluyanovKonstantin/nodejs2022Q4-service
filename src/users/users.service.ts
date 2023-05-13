import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    createUser(userDto: CreateUserDto) {
        const userToDB: User = {
            id: uuid(),
            login: userDto.login,
            password: userDto.password,
            version: 1,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };

        return this.userRepository
            .save(userToDB)
            .catch((err) => console.error(err));
    }

    getUsers() {
        return this.userRepository.find();
    }

    async getUser(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException(`user doesn't find`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async updateUserPassword(updatePasswordDto: UpdateUserDto, id: string) {
        const newUser = await this.userRepository
            .findOne({ where: { id } })
            .catch((err) => {
                console.error(err);
            });
        if (!newUser) {
            throw new HttpException(`user doesn't exist`, HttpStatus.NOT_FOUND);
        }
        if (newUser.password === updatePasswordDto.oldPassword) {
            newUser.version++;
            newUser.updatedAt = new Date().getTime();
            newUser.password = updatePasswordDto.newPassword;

            await this.userRepository.update(id, newUser);
            return newUser;
        } else {
            throw new HttpException('wrong password', HttpStatus.FORBIDDEN);
        }
    }

    async deleteUser(id: string) {
        const isExist = await this.userRepository
            .exist({ where: { id } })
            .catch((err) => {
                console.error(err);
            });
        if (!isExist) {
            throw new HttpException(`user doesn't exist`, HttpStatus.NOT_FOUND);
        }
        return this.userRepository.delete(id).catch((err) => {
            console.error(err);
        });
    }
}
