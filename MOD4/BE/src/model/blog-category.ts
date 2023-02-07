import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class BlogCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    idBlog: number
    @Column()
    idCategory: number
}