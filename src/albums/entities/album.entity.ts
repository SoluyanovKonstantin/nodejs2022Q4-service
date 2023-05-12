import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: string; // uuid v4

    @Column()
    name: string;

    @Column()
    year: number;

    @Column({ nullable: true })
    artistId: string | null; // refers to Artist
}
