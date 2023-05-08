import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';

const artists: Artist[] = [];

@Injectable()
export class ArtistsService {
    create(createArtistDto: CreateArtistDto) {
        artists.push({
            id: v4(),
            ...createArtistDto,
        });
        return artists[artists.length - 1];
    }

    findAll() {
        return artists;
    }

    findOne(id: string) {
        return artists.find((artist) => artist.id === id);
    }

    update(id: string, updateArtistDto: UpdateArtistDto) {
        const artist = artists.find((artist) => {
            if (artist.id === id) {
                artist.grammy = updateArtistDto.grammy;
                artist.name = updateArtistDto.name;
                return true;
            }

            return false;
        });

        if (!artist) throw new HttpException('not found', HttpStatus.NOT_FOUND);

        return artist;
    }

    remove(id: string) {
        const findIndex = artists.findIndex((artist) => artist.id === id);
        if (findIndex === -1)
            throw new HttpException('not found', HttpStatus.NOT_FOUND);

        artists.splice(findIndex, 1);
        return;
    }
}
