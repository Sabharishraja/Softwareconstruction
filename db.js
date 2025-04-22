const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DB,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

sql.connect(config)
    .then(pool => {
        console.log("✅ Connected to Azure SQL");
        return pool;
    })
    .catch(err => {
        console.error("❌ Connection failed:", err.message);
    });

module.exports = sql;
