import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Phones {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  country_code!: string;

  @Column("simple-array")
  phone!: string[];
};