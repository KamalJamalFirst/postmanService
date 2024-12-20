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
  synchronize: false, // Set to false in production
  logging: true,
  entities: [Countries, Phones], // List your entities here
  migrations: ["src/migrations/*.js"], // Adjust the path as needed
  extra : {
    "connectionLimit": 10
  },
  subscribers: [],
});