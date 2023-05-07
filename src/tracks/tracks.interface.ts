import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export interface Tracks {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export class TrackDto {
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
