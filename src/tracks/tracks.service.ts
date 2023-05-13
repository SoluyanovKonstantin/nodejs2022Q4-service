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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    constructor(
        private moduleRef: ModuleRef,
        @InjectRepository(Track)
        private trackRepository: Repository<Track>,
    ) {}
    onModuleInit() {
        this.favoritesService = this.moduleRef.get(FavoritesService, {
            strict: false,
        });
    }

    getTracks() {
        return this.trackRepository.find();
    }

    async getTrack(id: string) {
        const track = await this.trackRepository.findOne({ where: { id } });
        if (!track) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }
        return track;
    }

    async removeArtistIdFromTrack(value: string) {
        const track = await this.trackRepository.findOne({
            where: { artistId: value },
        });
        if (track) {
            track.artistId = null;
            return this.trackRepository.update(track.id, track);
        }

        return;
    }

    async createTrack(trackDTO: CreateTrackDto) {
        const track = {
            id: v4(),
            name: trackDTO.name,
            artistId: trackDTO.artistId,
            albumId: trackDTO.albumId,
            duration: trackDTO.duration,
        };
        return this.trackRepository.save(track);
    }

    async updateTrack(id: string, trackDto: CreateTrackDto) {
        const track = await this.trackRepository.findOne({ where: { id } });
        if (!track) throw new HttpException('not found', HttpStatus.NOT_FOUND);
        track.albumId = trackDto.albumId;
        track.artistId = trackDto.artistId;
        track.duration = trackDto.duration;
        track.name = trackDto.name;
        await this.trackRepository.update(id, track);
        return track;
    }

    async deleteTrack(id: string) {
        const isExist = await this.trackRepository.exist({ where: { id } });
        if (!isExist) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.favoritesService.removeTrack(id);
        } catch (error) {}

        await this.trackRepository.delete(id);
        return;
    }

    async removeAlbumFromTrackById(albumId: string) {
        const track = await this.trackRepository.findOne({
            where: { albumId },
        });
        if (track) {
            track.albumId = null;
            return await this.trackRepository.update(track.id, track);
        }

        return;
    }
}
