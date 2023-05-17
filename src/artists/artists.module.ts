import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [ArtistsController],
    providers: [ArtistsService],
    imports: [AlbumsModule, TypeOrmModule.forFeature([Artist])],
    exports: [ArtistsService],
})
export class ArtistsModule {}
