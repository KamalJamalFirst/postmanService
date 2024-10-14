import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Countries {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  country_code!: string;

  @Column()
  ip!: string;

  @Column()
  used!: boolean;
};