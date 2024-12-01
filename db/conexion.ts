import { Sequelize } from "sequelize";

const db = new Sequelize('pruebas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //login: false
})

export default db;