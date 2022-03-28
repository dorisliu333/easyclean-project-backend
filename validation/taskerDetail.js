const { check } = require('express-validator');

function taskerDetailValidationRules() {
    return [
        check('name', 'Tasker name is empty').notEmpty(),
        check('address', 'Tasker address is empty').notEmpty(),
        check('bankAccount', 'Tasker bankAccount is empty').notEmpty(),
        check('phoneNumber', 'Tasker phone number is empty').notEmpty(),
        check('image', 'Tasker image is empty').notEmpty(),
    ];
}

module.exports= {
    taskerDetailValidationRules,
};