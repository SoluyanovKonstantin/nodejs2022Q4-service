import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    version: number; // integer number, increments on update

    @Column('bigint')
    createdAt: number; // timestamp of creation

    @Column('bigint')
    updatedAt: number; // timestamp of last update
}
