"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Countries_1 = require("./entities/Countries"); // Adjust the path as needed
const Phones_1 = require("./entities/Phones"); // Example entity
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql", // Change to your database type
    host: 'localhost',
    port: 3306, // Default PostgreSQL port
    username: "postman",
    password: "postman_root",
    database: "postman_auto",
    synchronize: false, // Set to false in production
    logging: true,
    entities: [Countries_1.Countries, Phones_1.Phones], // List your entities here
    migrations: ["./migrations/**.js"], // Adjust the path as needed
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map