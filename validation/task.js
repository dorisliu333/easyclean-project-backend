const { check } = require('express-validator');

function taskCreateValidationRules() {
  return [
    check('title', 'Task title is empty').notEmpty(),
    check('detail', 'Task detail is empty').notEmpty(),
    check('category', 'Task category is empty').notEmpty(),
    check('postCode', 'Task postcode is empty').notEmpty(),
    check('dueDate', 'Task due date is empty').notEmpty(),
    check('priceBudget', 'Task price budget is empty').notEmpty(),
    check('clientId', 'Task client id is empty').notEmpty(),
  ];
};

function taskUpdateValidationRules() {
  return [
    check('title', 'Task title is empty').notEmpty(),
    check('detail', 'Task detail is empty').notEmpty(),
    check('category', 'Task category is empty').notEmpty(),
    check('postCode', 'Task postcode is empty').notEmpty(),
    check('dueDate', 'Task due date is empty').notEmpty(),
    check('priceBudget', 'Task price budget is empty').notEmpty(),
  ];
}

module.exports = {
  taskCreateValidationRules,
  taskUpdateValidationRules,
};
