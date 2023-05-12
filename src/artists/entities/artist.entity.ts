import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: string; // uuid v4

    @Column()
    name: string;

    @Column()
    grammy: boolean;
}
