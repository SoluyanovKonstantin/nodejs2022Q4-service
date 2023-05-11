import { Module, forwardRef } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
    controllers: [ArtistsController],
    providers: [ArtistsService],
    exports: [ArtistsService],
    imports: [TracksModule, AlbumsModule, forwardRef(() => FavoritesModule)],
})
export class ArtistsModule {}
