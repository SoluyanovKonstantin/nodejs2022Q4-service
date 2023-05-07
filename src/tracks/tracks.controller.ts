import { TracksService } from './tracks.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrackDto, Tracks } from './tracks.interface';

@ApiTags('track')
@Controller('track')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @Get()
    getUTracks(): Tracks[] {
        return this.tracksService.getTracks();
    }

    @Get(':id')
    getTrack(@Param('id', ParseUUIDPipe) id: string) {
        return this.tracksService.getTrack(id);
    }

    @Post()
    createTrack(@Body() trackDTO: TrackDto) {
        return this.tracksService.createTrack(trackDTO);
    }

    @Put(':id')
    updateTrack(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() trackDto: TrackDto,
    ) {
        return this.tracksService.updateTrack(id, trackDto);
    }

    @HttpCode(204)
    @Delete(':id')
    deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
        return this.tracksService.deleteTrack(id);
    }
}
