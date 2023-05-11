import { TracksService } from 'src/tracks/tracks.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';

const albums: Album[] = [];

export enum AlbumProperty {
    Id = 'id', // uuid v4
    Name = 'name',
    Year = 'year',
    ArtistId = 'artistId', // refers to Artist
}

@Injectable()
export class AlbumsService {
    constructor(private tracksService: TracksService) {}

    create(createAlbumDto: CreateAlbumDto) {
        albums.push({
            id: v4(),
            ...createAlbumDto,
        });
        return albums[albums.length - 1];
    }

    findAll() {
        return albums;
    }

    findOne(id: string) {
        const album = albums.find((album) => album.id === id);
        if (!album) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        return album;
    }

    getAlbumByProperty(value: string, prop: AlbumProperty) {
        return albums.find((album) => album[prop] === value);
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto) {
        const album = albums.find((album) => {
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

    remove(id: string) {
        const findIndex = albums.findIndex((artist) => artist.id === id);
        if (findIndex === -1)
            throw new HttpException('not found', HttpStatus.NOT_FOUND);

        const track = this.tracksService.getTrackByAlbumId(id);
        if (track) {
            track.albumId = null;
        }

        albums.splice(findIndex, 1);
        return;
    }
}
