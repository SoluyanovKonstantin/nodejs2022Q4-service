import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';

@Module({
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesService],
    imports: [AlbumsModule, TypeOrmModule.forFeature([Favorite])],
})
export class FavoritesModule {}
