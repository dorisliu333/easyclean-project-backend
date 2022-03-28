const dotenv = require('dotenv');
const envFound = dotenv.config();

module.exports = {
    port: process.env.PORT || 8000,
    api: {
        prefix: process.env.API_PREFIX || '/api/v1',
    },
    nodeEnv: process.env.NODE_ENV,
    mongodbConnection: `${process.env.CONNECTION_STRING}${process.env.DB_NAME}?retryWrites=true&w=majority`,
    mongodbConnectionTest: `${process.env.CONNECTION_STRING}${process.env.TEST_DB}?retryWrites=true&w=majority`
};
