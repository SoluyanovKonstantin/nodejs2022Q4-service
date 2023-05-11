import { Module, forwardRef } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
    controllers: [TracksController],
    providers: [TracksService],
    exports: [TracksService],
})
export class TracksModule {}
