import { TracksService } from './tracks.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';

@ApiTags('track')
@Controller('track')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @Get()
    getUTracks(): Track[] {
        return this.tracksService.getTracks();
    }

    @ApiParam({ name: 'id' })
    @Get(':id')
    getTrack(@Param('id', ParseUUIDPipe) id: string) {
        return this.tracksService.getTrack(id);
    }

    @Post()
    createTrack(@Body() trackDTO: CreateTrackDto) {
        return this.tracksService.createTrack(trackDTO);
    }

    @ApiParam({ name: 'id' })
    @Put(':id')
    updateTrack(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() trackDto: CreateTrackDto,
    ) {
        return this.tracksService.updateTrack(id, trackDto);
    }

    @ApiParam({ name: 'id' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
        return this.tracksService.deleteTrack(id);
    }
}
