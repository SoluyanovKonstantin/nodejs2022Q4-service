import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', { array: true })
    artists: string[]; // favorite artists ids

    @Column('character varying', { array: true })
    albums: string[]; // favorite albums ids

    @Column('character varying', { array: true })
    tracks: string[]; // favorite tracks ids
}
