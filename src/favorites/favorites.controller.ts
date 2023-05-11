import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favorite')
@Controller('favs')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post('track/:id')
    addTrack(@Param('id', ParseUUIDPipe) id: string) {
        return this.favoritesService.addTrack(id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('track/:id')
    removeTrack(@Param('id', ParseUUIDPipe) id: string) {
        return this.favoritesService.removeTrack(id);
    }

    @Post('album/:id')
    allAlbum(@Param('id', ParseUUIDPipe) id: string) {
        return this.favoritesService.addAlbum(id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('album/:id')
    removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
        return this.favoritesService.removeAlbum(id);
    }

    @Post('artist/:id')
    addArtist(@Param('id', ParseUUIDPipe) id: string) {
        return this.favoritesService.addArtist(id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('artist/:id')
    removeArtist(@Param('id', ParseUUIDPipe) id: string) {
        return this.favoritesService.removeArtist(id);
    }

    @Get()
    findAll() {
        return this.favoritesService.findAll();
    }
}
