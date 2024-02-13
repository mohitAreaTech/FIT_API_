const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const isAuth = require("../middleware/jsonwebtoken");

router.post('/login', authController.login);
router.post("/become-a-pos", authController.becomeAPos);
router.post("/update-pos/:id", authController.createPos); 
router.post("/upload-picture", isAuth, authController.uploadProfilePicture); 

router.post('/pos-login',authController.posLogin)
router.post("/forget", authController.forgetPassword);
router.post("/reset", authController.resetPassword); 


module.exports = router;