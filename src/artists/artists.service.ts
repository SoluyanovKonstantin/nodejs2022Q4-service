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
import { AlbumsService } from 'src/albums/albums.service';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService implements OnModuleInit {
    private favoritesService: FavoritesService;
    private tracksService: TracksService;
    constructor(
        private albumsService: AlbumsService,
        private moduleRef: ModuleRef,
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>,
    ) {}

    onModuleInit() {
        this.tracksService = this.moduleRef.get(TracksService, {
            strict: false,
        });
        this.favoritesService = this.moduleRef.get(FavoritesService, {
            strict: false,
        });
    }

    async create(createArtistDto: CreateArtistDto) {
        const artist = {
            id: v4(),
            ...createArtistDto,
        };
        try {
            await this.artistsRepository.save(artist);
        } catch (error) {
            throw new Error(error);
        }
        return artist;
    }

    findAll() {
        return this.artistsRepository.find();
    }

    async findOne(id: string) {
        const artist = await this.artistsRepository.findOne({ where: { id } });
        if (!artist) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        return artist;
    }

    async update(id: string, updateArtistDto: UpdateArtistDto) {
        await this.artistsRepository.update(id, updateArtistDto);
        const artist = await this.artistsRepository.findOne({ where: { id } });
        if (!artist) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        return artist;
    }

    async remove(id: string) {
        const artist = await this.artistsRepository.findOne({ where: { id } });
        if (!artist) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        this.artistsRepository.delete(id);

        await this.tracksService.removeArtistIdFromTrack(id);

        this.albumsService.removeArtistFromAlbum(id);

        try {
            await this.favoritesService.removeArtist(id);
        } catch (error) {}

        return;
    }
}
