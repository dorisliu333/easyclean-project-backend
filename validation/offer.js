const { check } = require('express-validator');

function offerValidationRules() {
    return [
        check('task', 'Offer task id is empty').notEmpty(),
        check('user', 'Offer user id is empty').notEmpty(),
        check('priceOffer', 'Offer price is empty').notEmpty(),
        check('priceAssigned', 'Offer price assigned is empty').notEmpty(),
        check('offerComment', 'Offer comment is Empty').notEmpty(),
    ];
}

module.exports = {
    offerValidationRules,
};