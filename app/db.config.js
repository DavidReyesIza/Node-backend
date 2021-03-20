module.exports = {
    HOST : "localhost",
    USER : "root",
    PASSWORD: "david1",
    DB: "testdbb",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        adquire : 30000,
        idle: 10000
    }
};