import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
    controllers: [ArtistsController],
    providers: [ArtistsService],
    imports: [AlbumsModule],
    exports: [ArtistsService],
})
export class ArtistsModule {}
