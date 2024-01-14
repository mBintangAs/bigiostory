import Sequelize from "sequelize"
import 'dotenv/config'
// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT, /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    timezone: '+07:00'
});

