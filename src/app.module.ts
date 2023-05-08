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

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'diablo22',
            database: 'nodejs2022Q4',
            entities: [User, Track, Artist],
            synchronize: true,
        }),
        UsersModule,
        TracksModule,
        ArtistsModule,
        AlbumsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
