import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
    @PrimaryColumn('uuid')
    id: string; // uuid v4

    @Column()
    name: string;

    @Column()
    grammy: boolean;
}
