import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
    Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Post()
    create(@Body() createArtistDto: CreateArtistDto) {
        return this.artistsService.create(createArtistDto);
    }

    @Get()
    findAll() {
        return this.artistsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.artistsService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateArtistDto: UpdateArtistDto,
    ) {
        return this.artistsService.update(id, updateArtistDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.artistsService.remove(id);
    }
}
