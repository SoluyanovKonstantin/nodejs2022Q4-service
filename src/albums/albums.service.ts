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

export enum AlbumProperty {
    Id = 'id', // uuid v4
    Name = 'name',
    Year = 'year',
    ArtistId = 'artistId', // refers to Artist
}

@Injectable()
export class AlbumsService implements OnModuleInit {
    private albums: Album[] = [];
    private favoritesService: FavoritesService;
    private tracksService: TracksService;

    constructor(private moduleRef: ModuleRef) {}
    onModuleInit() {
        this.tracksService = this.moduleRef.get(TracksService, {
            strict: false,
        });
        this.favoritesService = this.moduleRef.get(FavoritesService, {
            strict: false,
        });
    }

    create(createAlbumDto: CreateAlbumDto) {
        this.albums.push({
            id: v4(),
            ...createAlbumDto,
        });
        return this.albums[this.albums.length - 1];
    }

    findAll() {
        return this.albums;
    }

    findOne(id: string) {
        const album = this.albums.find((album) => album.id === id);
        if (!album) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        return album;
    }

    getAlbumByProperty(value: string, prop: AlbumProperty) {
        return this.albums.find((album) => album[prop] === value);
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto) {
        const album = this.albums.find((album) => {
            if (album.id === id) {
                album.artistId = updateAlbumDto.artistId;
                album.name = updateAlbumDto.name;
                album.year = updateAlbumDto.year;
                return true;
            }

            return false;
        });

        if (!album) throw new HttpException('not found', HttpStatus.NOT_FOUND);

        return album;
    }

    async remove(id: string) {
        const findIndex = this.albums.findIndex((artist) => artist.id === id);
        if (findIndex === -1)
            throw new HttpException('not found', HttpStatus.NOT_FOUND);

        await this.tracksService.removeAlbumFromTrackById(id);

        try {
            await this.favoritesService.removeAlbum(id);
        } catch (error) {}

        this.albums.splice(findIndex, 1);
        return;
    }
}
