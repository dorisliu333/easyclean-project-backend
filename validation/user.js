const { check } = require('express-validator');

function loginValidationRules() {
    return [
        check('email', 'User email id is invalid').notEmpty().isEmail(),
        check('password', 'User password is empty').notEmpty(),
    ];
}

function userValidationRules() {
    const loginChain = loginValidationRules();
    return loginChain.concat([
        check('username', 'User name is empty').notEmpty(),
        check('postcode', 'User postcode is empty').notEmpty(),
        check('userType', 'User type is empty').notEmpty(),
    ]);
}



module.exports = {
    userValidationRules,
    loginValidationRules,
};