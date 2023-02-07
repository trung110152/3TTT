import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user: number
    @Column()
    status: string
    @Column()
    blog: number
}