import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user: number
    @Column()
    comment: string
    @Column()
    blog: number
}