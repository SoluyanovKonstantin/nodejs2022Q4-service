import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesService],
    imports: [
        forwardRef(() => ArtistsModule),
        forwardRef(() => AlbumsModule),
        TracksModule,
    ],
})
export class FavoritesModule {}
