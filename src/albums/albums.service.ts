import { ModuleRef } from '@nestjs/core';
import { TracksService } from 'src/tracks/tracks.service';
import {
    HttpException,
    HttpStatus,
    Injectable,
    OnModuleInit,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export enum AlbumProperty {
    Id = 'id', // uuid v4
    Name = 'name',
    Year = 'year',
    ArtistId = 'artistId', // refers to Artist
}

@Injectable()
export class AlbumsService implements OnModuleInit {
    private favoritesService: FavoritesService;
    private tracksService: TracksService;

    constructor(
        private moduleRef: ModuleRef,
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
    ) {}
    onModuleInit() {
        this.tracksService = this.moduleRef.get(TracksService, {
            strict: false,
        });
        this.favoritesService = this.moduleRef.get(FavoritesService, {
            strict: false,
        });
    }

    async create(createAlbumDto: CreateAlbumDto) {
        const album = {
            id: v4(),
            ...createAlbumDto,
        };
        try {
            await this.albumRepository.save(album);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return album;
    }

    findAll() {
        return this.albumRepository.find();
    }

    async findOne(id: string) {
        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        return album;
    }

    async removeArtistFromAlbum(artistId: string) {
        const album = await this.albumRepository.findOne({
            where: { artistId },
        });
        if (album) {
            album.artistId = null;
            await this.albumRepository.update(album.id, album);
        }
    }

    async update(id: string, updateAlbumDto: UpdateAlbumDto) {
        await this.albumRepository.update(id, updateAlbumDto);

        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) throw new HttpException('not found', HttpStatus.NOT_FOUND);

        return album;
    }

    async remove(id: string) {
        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) throw new HttpException('not found', HttpStatus.NOT_FOUND);

        await this.tracksService.removeAlbumFromTrackById(id);

        try {
            await this.favoritesService.removeAlbum(id);
        } catch (error) {}

        this.albumRepository.delete(id);
        return;
    }
}
