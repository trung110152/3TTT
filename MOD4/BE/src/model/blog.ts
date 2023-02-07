import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Blog{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    content: string
    @Column()
    status: string
    @Column()
    image: string
    @Column()
    date: string
    @Column()
    user: number
}