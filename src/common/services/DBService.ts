import { config } from "@src/config";
import { Dialect, Sequelize } from "sequelize";

export const DBInstance =  new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDialect as Dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    port: Number(config.dbPort),
    logging: true,
  });


