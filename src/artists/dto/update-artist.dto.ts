import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
    grammy: boolean;
}
