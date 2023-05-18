import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [AlbumsController],
    providers: [AlbumsService],
    exports: [AlbumsService],
    imports: [TypeOrmModule.forFeature([Album])],
})
export class AlbumsModule {}
