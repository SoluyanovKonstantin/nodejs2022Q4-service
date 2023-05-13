import { ModuleRef } from '@nestjs/core';
import { AlbumsService } from './../albums/albums.service';
import { ArtistsService } from './../artists/artists.service';
import {
    HttpException,
    HttpStatus,
    Injectable,
    OnModuleInit,
} from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService implements OnModuleInit {
    private artistsService: ArtistsService;
    private tracksService: TracksService;
    constructor(
        private albumsService: AlbumsService,
        private moduleRef: ModuleRef,
        @InjectRepository(Favorite)
        private favoritesRepository: Repository<Favorite>,
    ) {}

    async onModuleInit() {
        const isFavoritesExist = await this.favoritesRepository.exist({
            where: { id: 1 },
        });
        if (!isFavoritesExist) {
            this.favoritesRepository.save({
                id: 1,
                artists: [],
                albums: [],
                tracks: [],
            });
        }
        this.tracksService = this.moduleRef.get(TracksService, {
            strict: false,
        });
        this.artistsService = this.moduleRef.get(ArtistsService, {
            strict: false,
        });
    }

    async addArtist(id: string) {
        try {
            this.artistsService.findOne(id);
            const fav = await this.favoritesRepository.findOne({
                where: { id: 1 },
            });
            fav.artists.push(id);
            return await this.favoritesRepository.update(1, fav);
        } catch {
            throw new HttpException(
                `doesn't exist`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
    async removeArtist(id: string) {
        const favs = await this.favoritesRepository.findOne({
            where: { id: 1 },
        });
        const artistId = favs.artists.findIndex((artist) => artist === id);
        if (artistId === -1) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        favs.artists.splice(artistId, 1);
        return await this.favoritesRepository.update(1, favs);
    }

    async addTrack(id: string) {
        try {
            await this.tracksService.getTrack(id);
            const favs = await this.favoritesRepository.findOne({
                where: { id: 1 },
            });
            favs.tracks.push(id);
            return await this.favoritesRepository.update(1, favs);
        } catch {
            throw new HttpException(
                `doesn't exist`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
    async removeTrack(id: string) {
        const favs = await this.favoritesRepository.findOne({
            where: { id: 1 },
        });
        const trackId = favs.tracks.findIndex((artist) => artist === id);
        if (trackId === -1) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        favs.tracks.splice(trackId, 1);
        return await this.favoritesRepository.update(1, favs);
    }

    async addAlbum(id: string) {
        try {
            const favs = await this.favoritesRepository.findOne({
                where: { id: 1 },
            });
            this.albumsService.findOne(id);
            favs.albums.push(id);
            return await this.favoritesRepository.update(1, favs);
        } catch {
            throw new HttpException(
                `doesn't exist`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
    }
    async removeAlbum(id: string) {
        const favs = await this.favoritesRepository.findOne({
            where: { id: 1 },
        });
        const albumId = favs.albums.findIndex((artist) => artist === id);
        if (albumId === -1) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        favs.albums.splice(albumId, 1);
        return await this.favoritesRepository.update(1, favs);
    }

    async findAll() {
        const favoritesResp: FavoriteResponseDto = {
            artists: [],
            albums: [],
            tracks: [],
        };

        const favs = await this.favoritesRepository.findOne({
            where: { id: 1 },
        });

        for (let index = 0; index < favs.albums.length; index++) {
            const album = this.albumsService.findOne(favs.albums[index]);
            favoritesResp.albums.push(album);
        }

        for (let index = 0; index < favs.artists.length; index++) {
            const artist = this.artistsService.findOne(favs.artists[index]);
            favoritesResp.artists.push(artist);
        }

        for (let index = 0; index < favs.tracks.length; index++) {
            const track = this.tracksService.getTrack(favs.tracks[index]);
            favoritesResp.tracks.push(await track);
        }

        return favoritesResp;
    }
}
