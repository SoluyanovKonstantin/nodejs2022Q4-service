import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
    controllers: [TracksController],
    providers: [TracksService],
    exports: [TracksService],
    imports: [TypeOrmModule.forFeature([Track])],
})
export class TracksModule {}
