import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesService],
    imports: [AlbumsModule],
})
export class FavoritesModule {}
