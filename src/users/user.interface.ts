import { ApiProperty } from '@nestjs/swagger';

export interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export class UserDto {
    @ApiProperty()
    login: string;

    @ApiProperty()
    password: string;
}

export class UpdatePasswordDto {
    @ApiProperty()
    oldPassword: string; // previous password

    @ApiProperty()
    newPassword: string; // new password
}
