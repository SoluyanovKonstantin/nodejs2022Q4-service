import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    artistId: string | null; // refers to Artist

    @ApiProperty()
    albumId: string | null; // refers to Album

    @IsNotEmpty()
    @ApiProperty()
    duration: number; // integer number
}
