const express = require('express');
const { oneOf } = require('express-validator');
const authGuard = require('../../middleware/authGuard');
const { taskCreateValidationRules, taskUpdateValidationRules } = require('../../validation/task');
const { offerValidationRules } = require('../../validation/offer');
const { taskerDetailValidationRules } = require('../../validation/taskerDetail');
const { 
    loginValidationRules,
    userValidationRules,
} = require('../../validation/user');


const router = new express.Router();
const usersControllers = require('../../controllers/api/v1/users');
const tasksControllers = require('../../controllers/api/v1/tasks');
const myTasksControllers = require('../../controllers/api/v1/mytasks');
const taskerDetailsControllers = require('../../controllers/api/v1/taskerDetails');
const { login } = require('../../controllers/api/v1/auth');
const offerControllers = require('../../controllers/api/v1/offers');

// User router
router.get('/users', usersControllers.index);
router.get('/users/:id', usersControllers.show);
router.put('/users/:id',authGuard, userValidationRules(), usersControllers.update);
// router.patch('/users/:id', usersControllers.update);
router.delete('/users/:id', authGuard,usersControllers.destroy);

// Task router
router.post('/tasks', authGuard, taskCreateValidationRules(), tasksControllers.createTask);
router.get('/tasks', tasksControllers.index);
router.get('/tasks/:id', tasksControllers.show);
router.put('/tasks/:id', authGuard,  taskUpdateValidationRules(), tasksControllers.update);
router.put('/tasks/:id/status/:status', authGuard, tasksControllers.updateTaskStatus);
router.delete('/tasks/:id',authGuard, tasksControllers.destroy);


// Tasker detail router
router.get('/taskerDetails', taskerDetailsControllers.index);
router.get('/taskerDetails/:id', taskerDetailsControllers.show);
router.put('/taskerDetails/:id', authGuard, 
taskerDetailValidationRules(), taskerDetailsControllers.update);
router.post('/taskerDetails', authGuard,
taskerDetailValidationRules(), taskerDetailsControllers.store);
router.delete('/taskerDetails/:id', authGuard,
taskerDetailsControllers.destroy);

// MyTasks router
router.get('/mytasks', authGuard,myTasksControllers.showByClientId);

// SignUp Procedure
router.post('/users', userValidationRules(), usersControllers.store);

// Log in
router.post('/auth', loginValidationRules(), login);

//get user by token in the header
router.get('/getUser', usersControllers.getUserByToken);
router.get('/offers',  offerControllers.getAllOffers);
router.get('/offers/:id', offerControllers.getOfferById);
router.put('/offers/:id',authGuard,  
offerControllers.updateOfferById);



router.post('/offers', authGuard, offerValidationRules(), 
offerControllers.createOffer);
router.delete('/offers/:id', authGuard,offerControllers.deleteOfferById);

module.exports = router;
