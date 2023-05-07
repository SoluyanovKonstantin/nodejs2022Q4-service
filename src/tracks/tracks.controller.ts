import { TracksService } from './tracks.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tracks } from './tracks.interface';

@ApiTags('track')
@Controller('track')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @Get()
    getUTracks(): Tracks[] {
        return this.tracksService.getTracks();
    }
}
