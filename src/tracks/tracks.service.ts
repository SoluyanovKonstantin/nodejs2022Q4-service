import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';

const tracks: Track[] = [];

@Injectable()
export class TracksService {
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
        tracks.splice(trackIndex, 1);
        return;
    }

    getTrackByAlbumId(albumId: string) {
        return tracks.find((track) => track.albumId === albumId);
    }
}
