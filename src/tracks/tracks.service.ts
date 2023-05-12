import {
    HttpException,
    Injectable,
    HttpStatus,
    OnModuleInit,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ModuleRef } from '@nestjs/core';

const tracks: Track[] = [];

export enum TrackPropery {
    Id = 'id',
    Name = 'name',
    ArtistId = 'artistId',
    AlbumId = 'albumId',
    Duration = 'duration',
}

@Injectable()
export class TracksService implements OnModuleInit {
    private favoritesService: FavoritesService;
    constructor(private moduleRef: ModuleRef) {}
    onModuleInit() {
        this.favoritesService = this.moduleRef.get(FavoritesService, {
            strict: false,
        });
    }

    getTracks() {
        return tracks;
    }

    getTrack(id: string) {
        const track = tracks.find((track) => track.id === id);
        if (!track) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }
        return track;
    }

    getTrackByProperty(value: string, prop: TrackPropery) {
        return tracks.find((track) => track[prop] === value);
    }

    createTrack(trackDTO: CreateTrackDto) {
        tracks.push({
            id: v4(),
            name: trackDTO.name,
            artistId: trackDTO.artistId,
            albumId: trackDTO.albumId,
            duration: trackDTO.duration,
        });
        return tracks[tracks.length - 1];
    }

    updateTrack(id: string, trackDto: CreateTrackDto) {
        const track = tracks.find((track) => track.id === id);
        if (!track) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        track.albumId = trackDto.albumId;
        track.artistId = trackDto.artistId;
        track.duration = trackDto.duration;
        track.name = trackDto.name;
        return track;
    }

    deleteTrack(id: string) {
        const trackIndex = tracks.findIndex((track) => track.id === id);
        if (trackIndex === -1) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        try {
            this.favoritesService.removeTrack(id);
        } catch (error) {}

        tracks.splice(trackIndex, 1);
        return;
    }

    getTrackByAlbumId(albumId: string) {
        return tracks.find((track) => track.albumId === albumId);
    }
}
