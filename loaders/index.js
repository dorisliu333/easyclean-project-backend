const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

//customised function
exports.init = (expressApp) => {
    const mongoConnection = mongooseLoader();
    expressLoader(expressApp);
};

