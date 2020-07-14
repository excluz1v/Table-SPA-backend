module.exports = {
    HOST: "localhost",
    user: "root",
    password: "root",
    database: 'mysql',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    // HOST: "sql7.freemysqlhosting.net",
    // user: "sql7353628",
    // password: "U7KhngwYsE",
    // database: 'sql7353628',
    // dialect: "mysql",
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // }
};