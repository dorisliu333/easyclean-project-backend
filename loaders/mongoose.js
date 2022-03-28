const mongoose = require('mongoose');
const config = require('../../src/config/app');

module.exports = async function () {
    let connectionString = config.mongodbConnection;
    if (config.nodeEnv === "test") {
        connectionString = config.mongodbConnectionTest;
    }

    const db = mongoose.connection;
    db.on('connected', () => {
        console.log(`DB connected with ${connectionString}`);
    });
    db.on('error', (error) => {
        console.log(`DB connection failed ${error.message}`);
        process.exit(1);
    });
    db.on('disconnected', () => {
        console.log('DB disconnected');
    });

    const connection = await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    return connection.connection.db;
};
