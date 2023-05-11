import { AlbumsService } from './../albums/albums.service';
import { ArtistsService } from './../artists/artists.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoriteResponseDto } from './dto/favorite-response.dto';

const favs: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
};

@Injectable()
export class FavoritesService {
    constructor(
        private tracksService: TracksService,
        private artistsService: ArtistsService,
        private albumsService: AlbumsService,
    ) {}

    addArtist(id: string) {
        try {
            this.artistsService.findOne(id);
            favs.artists.push(id);
        } catch {
            throw new HttpException(
                `doesn't exist`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
    removeArtist(id: string) {
        const artistId = favs.artists.findIndex((artist) => artist === id);
        if (artistId === -1) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        favs.artists.splice(artistId, 1);
    }

    addTrack(id: string) {
        try {
            this.tracksService.getTrack(id);
            favs.tracks.push(id);
        } catch {
            throw new HttpException(
                `doesn't exist`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
    removeTrack(id: string) {
        const trackId = favs.tracks.findIndex((artist) => artist === id);
        if (trackId === -1) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        favs.tracks.splice(trackId, 1);
    }

    addAlbum(id: string) {
        try {
            this.albumsService.findOne(id);
            favs.albums.push(id);
        } catch {
            throw new HttpException(
                `doesn't exist`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
    removeAlbum(id: string) {
        const albumId = favs.albums.findIndex((artist) => artist === id);
        if (albumId === -1) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        favs.albums.splice(albumId, 1);
    }

    findAll() {
        const favoritesResp: FavoriteResponseDto = {
            artists: [],
            albums: [],
            tracks: [],
        };

        favs.albums.forEach((id) => {
            const album = this.albumsService.findOne(id);
            favoritesResp.albums.push(album);
        });

        favs.artists.forEach((id) => {
            const artist = this.artistsService.findOne(id);
            favoritesResp.artists.push(artist);
        });

        favs.tracks.forEach((id) => {
            const track = this.tracksService.getTrack(id);
            favoritesResp.tracks.push(track);
        });

        return favoritesResp;
    }
}
