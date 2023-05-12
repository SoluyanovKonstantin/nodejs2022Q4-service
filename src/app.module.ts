import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { User } from './users/entities/user.entity';
import { Track } from './tracks/entities/track.entity';
import { Artist } from './artists/entities/artist.entity';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorite } from './favorites/entities/favorite.entity';
import { Album } from './albums/entities/album.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'diablo22',
            database: 'nodejs2022Q4',
            entities: [User, Track, Artist, Favorite, Album],
            synchronize: true,
        }),
        UsersModule,
        TracksModule,
        ArtistsModule,
        AlbumsModule,
        FavoritesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
