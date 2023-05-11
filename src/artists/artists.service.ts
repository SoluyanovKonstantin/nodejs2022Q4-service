import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackPropery, TracksService } from 'src/tracks/tracks.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';
import { AlbumProperty, AlbumsService } from 'src/albums/albums.service';

const artists: Artist[] = [];

@Injectable()
export class ArtistsService {
    constructor(
        private tracksService: TracksService,
        private albumsService: AlbumsService,
    ) {}

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
        const artist = artists.find((artist) => artist.id === id);
        if (!artist) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        return artist;
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

        const track = this.tracksService.getTrackByProperty(
            id,
            TrackPropery.ArtistId,
        );

        if (track) track.artistId = null;

        const album = this.albumsService.getAlbumByProperty(
            id,
            AlbumProperty.ArtistId,
        );

        if (album) album.artistId = null;

        artists.splice(findIndex, 1);
        return;
    }
}
