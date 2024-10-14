import "reflect-metadata";
import { DataSource } from "typeorm";
import { Countries } from "./entities/Countries"; // Adjust the path as needed
import { Phones } from "./entities/Phones"; // Example entity

export const AppDataSource = new DataSource({
  type: "mysql", // Change to your database type
  host: 'localhost',
  port: 3306, // Default PostgreSQL port
  username: "postman",
  password: "postman_root",
  database: "postman_auto",
  synchronize: true, // Set to false in production
  logging: false,
  entities: [Countries, Phones], // List your entities here
  migrations: ["./migrations/*.ts"], // Adjust the path as needed
  subscribers: [],
});