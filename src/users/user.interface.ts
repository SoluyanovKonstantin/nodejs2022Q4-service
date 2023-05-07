import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export class UserDto {
    @IsNotEmpty()
    @ApiProperty()
    login: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

export class UpdatePasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    oldPassword: string; // previous password

    @IsNotEmpty()
    @ApiProperty()
    newPassword: string; // new password
}
