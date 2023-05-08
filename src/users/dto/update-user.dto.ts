import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    oldPassword: string; // previous password

    @IsNotEmpty()
    @ApiProperty()
    newPassword: string; // new password
}
