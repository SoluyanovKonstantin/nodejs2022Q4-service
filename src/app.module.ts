import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'diablo22',
            database: 'nodejs2022Q4',
            entities: [],
            synchronize: true,
        }),
        UsersModule,
        TracksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
