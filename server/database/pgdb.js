const { Client } = require("pg"); // PostgreSQL라이브러리 사용
require("dotenv").config();

// PostgreSQL DB setting
const pgConfig = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
};

/** database연결해서 query실행 Input: sqlSyntax, paramData */
const dbConnection = (sql, param) => {
    const dbClient = new Client(pgConfig);

    dbClient.connect();

    return new Promise((resolve, reject) => {
        if (!param) {
            dbClient.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                if (res.command === "SELECT") resolve(res.rows);
                resolve(res);
                dbClient.end();
            });
        } else {
            dbClient.query(sql, param, (err, res) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                console.log(res);
                if (res.command === "SELECT") resolve(res.rows);
                resolve(res);
                dbClient.end();
            });
        }
    });
};

module.exports = { dbConnection };
