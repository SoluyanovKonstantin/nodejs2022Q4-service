import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    year: number;

    @ApiProperty()
    artistId: string | null; // refers to Artist
}
