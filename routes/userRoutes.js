
const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')
const router = express.Router();


router
    .route('/register')
    .post(authController.register)
router
    .route('/login')
    .post(authController.login)
router
    .route('/')
    .get(authController.protect, userController.getAllUsers)
    .post(userController.createUser);
router
    .use(authController.protect)
    .route('/me')
    .get(userController.getCurrentUser)
router
    .use(authController.protect)
    .route('/me/ailments')
    .get(userController.getCurrentUsersAilments)
router
    .use(authController.protect, authController.restrictTo('admin'))
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;