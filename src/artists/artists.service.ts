import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import {
    HttpException,
    HttpStatus,
    Injectable,
    OnModuleInit,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';
import { AlbumProperty, AlbumsService } from 'src/albums/albums.service';
import { ModuleRef } from '@nestjs/core';

const artists: Artist[] = [];

@Injectable()
export class ArtistsService implements OnModuleInit {
    private favoritesService: FavoritesService;
    private tracksService: TracksService;
    constructor(
        private albumsService: AlbumsService,
        private moduleRef: ModuleRef,
    ) {}

    onModuleInit() {
        this.tracksService = this.moduleRef.get(TracksService, {
            strict: false,
        });
        this.favoritesService = this.moduleRef.get(FavoritesService, {
            strict: false,
        });
    }

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

    async remove(id: string) {
        const findIndex = artists.findIndex((artist) => artist.id === id);
        if (findIndex === -1)
            throw new HttpException('not found', HttpStatus.NOT_FOUND);

        await this.tracksService.removeArtistIdFromTrack(id);

        const album = this.albumsService.getAlbumByProperty(
            id,
            AlbumProperty.ArtistId,
        );

        try {
            await this.favoritesService.removeArtist(id);
        } catch (error) {}

        if (album) album.artistId = null;

        artists.splice(findIndex, 1);
        return;
    }
}
