const express = require('express');

const isAuth = require('../middleware/jsonwebtoken')

const router = express.Router();

const trainingController = require('../controller/training');

router.get('/get-module', isAuth, trainingController.getTrainingModule)
router.get('/module-complete/:id', isAuth, trainingController.moduleComplete)
router.get('/start-exam', isAuth, trainingController.startQuizExam)
router.post('/answer', isAuth, trainingController.answerAttempt)
router.get('/end-exam', isAuth, trainingController.endExam)
router.get('/get-answer', isAuth, trainingController.getattemptAnswer)
router.get('/result', isAuth, trainingController.seeExamResult)
router.get('/certificate/:id', trainingController.getcertificate)
router.get('/get-marks/:id', trainingController.getMarks)
module.exports = router