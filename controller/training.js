const Sequelize = require("../utils/database");
const { dataNotFound } = require("../helper/functions");
const { ExamAtempts, Pos, Exam, Question, ExamResult, User_Question, User_module, Module, User, Document } = require("../model");
const {examAttempts} = require("../model/exam-attempt");
const {generatePdf, htmlToPdfBuffer} = require("../helper/certificate");

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  exports.getTrainingModule = async (req, res, next) => {
    try {
      //
      const userModule = await User_module.findAll({
        include: [
          {
            model: Module,
            where: { status: "1" },
          },
        ],
        where: { traineeId: req.userId },
      });
  
      return res.status(200).json({
        message: "Users module fetched",
        data: userModule,
        status: true,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.moduleComplete = async (req, res, next) => {
    try {
      const userModule = await User_module.findOne({ where: { id: req.params.id } });
      if (!userModule) {
        return res.status(400).json({
          message: "No module assign to you",
          status: false,
        });
      }
      if (userModule.isCompleted == false) {
        userModule.isCompleted = true;
        await userModule.save();
        await userModule.reload();
  
        res.status(200).json({
          message: "Module completed",
          status: true,
          data: userModule,
        });
      } else {
        userModule.isCompleted = false;
        await userModule.save();
        await userModule.reload();
  
        res.status(200).json({
          message: "Module Incomplete",
          status: true,
          data: userModule,
        });
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.startQuizExam = async (req, res, next) => {
    try {
      const pass = await ExamAtempts.findOne({ where: { traineeId: req.userId, result: "pass" } });
      if (pass) {
        return res.status(200).json({
          message: "You Already Cleared The POS TRAINING EXAM",
          status: true,
        });
      }
      const userModule = await User_module.findOne({ where: { traineeId: req.userId, isCompleted: false } });
      if (userModule) {
        return res.status(400).json({
          message: "you are not eligble for exam First completed all the modules",
          status: false,
        });
      }
      const examId = 1;
      const exam = await Exam.findOne({
        where: { id: examId },
        include: [{ model: Question, attributes: ["id"] }],
      });
      dataNotFound(exam, "Invalid Exam Request", 404);
  
      const attempt_number = await examAttempts.count({
        where: { examId: examId, traineeId: req.userId },
      });
  
      const questions = await Question.findAll({
        where: { examId: examId },
        order: [Sequelize.random()],
        limit: 50
      });
      const arr = []
      for (var i = 0; i < questions.length; i++) {
        const obj = {
          questionId: questions[i].id,
          userId: req.userId
        }
        arr.push(obj)
      }
      await User_Question.bulkCreate(arr)
  
      const attempt = await examAttempts.create({
        attempt_number: attempt_number + 1,
        examId: examId,
        traineeId: req.userId,
      });
      return res.send({
        message: "Started",
        status: true,
        data: {
          attempId: attempt.id,
          questions,
        },
        Exam: { title: exam.exam },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.answerAttempt = async (req, res, next) => {
    try {
      const question = await Question.findOne({ where: { id: req.body.question } });
      dataNotFound(question, 404, "invalid question");
  
      const exam = await Exam.findOne({ where: { id: question.examId }, include: [{ model: Question }] });
      dataNotFound(exam, 404, "invalid question");
  
      const attempt = await ExamAtempts.findOne({
        where: {
          examId: question.examId,
          traineeId: req.userId,
        },
        order: [["createdAt", "DESC"]],
      });
  
      const examattempt = await ExamResult.findOne({
        where: { attemptId: attempt.id, questionId: question.id, traineeId: req.userId },
      });
  
      if (examattempt) {
        if (examattempt.answer_given == null || examattempt.status == "skipped") {
          examattempt.answer_given = req.body.given_answer;
          (examattempt.status =
            req.body.given_answer == "skipped"
              ? "skipped"
              : req.body.given_answer == question.correctOption
                ? "correct"
                : "incorrect"),
            await examattempt.save();
          await examattempt.reload();
          return res.status(200).json({
            message: "Question Edited successfully",
            status: true,
          });
        } else {
          return res.status(400).json({
            message: "You already Submitted the Question You Can Not Edit Now",
            status: false,
          });
        }
      }
      await ExamResult.create({
        answer_given: req.body.given_answer == "skipped" ? null : req.body.given_answer,
        correct_answer: question.correctOption,
        status:
          req.body.given_answer == "skipped"
            ? "skipped"
            : req.body.given_answer == question.correctOption
              ? "correct"
              : "incorrect",
        questionId: question.id,
        attemptId: attempt.id,
        traineeId: req.userId,
      });
      const result = await ExamResult.count({
        where: { traineeId: req.userId, attemptId: attempt.id },
      });
      if (result == exam.questions.length) {
        return res.status(200).json({
          message:
            "thankyou ,You Already submitted All the question,Check the skipped question Now you can end exam by clicking End-Exam button",
          status: true,
        });
      }
      return res.send({ message: "successfully submitted", status: true });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.endExam = async (req, res, next) => {
    try {
      const attempts = await ExamAtempts.findOne({
        where: {
          examId: 1,
          traineeId: req.userId,
        },
        order: [["createdAt", "DESC"]],
      });
      attempts.status = "ended";
      await attempts.save();
      await attempts.reload();
  
      const exam = await Exam.findOne({
        where: { id: 1 },
        include: [{ model: Question }],
      });
      const user_question = await User_Question.findAll({ where: { userId: req.userId }, order: [["id", "DESC"]], limit: 50 })
      const arr = [];
      user_question.forEach((element) => {
        arr.push(element.questionId);
      });
  
      console.log("exam on end-exam", exam)
  
      const attempt = await examAttempts.findOne({
        where: { examId: exam.id, traineeId: req.userId },
        order: [["createdAt", "DESC"]],
      });
  
      const result = await ExamResult.findAll({
        where: { questionId: arr, traineeId: req.userId },
        limit: arr.length,
        include: [
          {
            model: Question,
            attributes: ["question"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
  
      let correct = 0,
        inCorrect = 0,
        skipped = 0;
      result.forEach((res) => {
        res.dataValues.status == "skipped" ? skipped++ : res.dataValues.status == "correct" ? correct++ : inCorrect++;
      });
      const final = (correct / arr.length) * 100;
  
      //saving result
      if (attempt.attempt_result == null) {
        await attempt.update({ status: "ended" });
        await attempt.reload();
        const timetaken =
          Math.round(new Date(attempt.updatedAt).getTime() / 1000) -
          Math.round(new Date(attempt.createdAt).getTime() / 1000);
  
        let data = {
          obtained_marks: final.toFixed(2) + "%",
          skipped: skipped,
          total_questions: arr.length,
          question_answered: correct + inCorrect,
          correct,
          inCorrect,
          timetaken,
          exam: { title: exam.exam },
        };
      
        attempt.update({ attempt_result: JSON.stringify(data) });
  
        if (data.obtained_marks > "35") {
          attempt.result = "pass";
          await attempt.save();
          await attempt.reload();
  
          await Pos.update({
            isTrainee: false,
            status: "certified"
          }, { where: { posId: req.userId } })
  
        } else {
          attempt.result = "fail";
          await attempt.save();
          await attempt.reload();
        }
      }
  
      return res.status(200).send({
        status: true,
        data: attempt.attempt_result,
        message: "fetched successfully",
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }; 

  exports.getattemptAnswer = async (req, res, next) => {
    try {
      const answers = await ExamResult.findAll({
        where: { traineeId: req.userId },
        order: [["createdAt", "DESC"]],
        include: [Question],
      });
      res.status(200).json({
        message: "Answer fetched",
        data: answers,
        status: true,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.seeExamResult = async (req, res, next) => {
    try {
      const exam = await Exam.findOne({
        where: { id: 1 },
        include: [{ model: Question }],
      });
      const user_question = await User_Question.findAll({ where: { userId: req.userId }, order: [["id", "DESC"]], limit: 50 })
      const arr = [];
      user_question.forEach((element) => {
        arr.push(element.questionId);
      });
      console.log("exam in result", exam)
      dataNotFound(exam, "Invalid Quiz", 404);
      const attempt = await examAttempts.findOne({
        where: { examId: exam.id, traineeId: req.userId },
        order: [["createdAt", "DESC"]],
      });
      const result = await ExamResult.findAll({
        where: { questionId: arr, traineeId: req.userId },
        limit: arr.length,
        include: [
          {
            model: Question,
            attributes: ["question"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
  
    
      let correct = 0,
        inCorrect = 0,
        skipped = 0;
      result.forEach((res) => {
        res.dataValues.status == "skipped" ? skipped++ : res.dataValues.status == "correct" ? correct++ : inCorrect++;
      });
      const final = (correct / arr.length) * 100;
    
  
      //saving result
      if (attempt.attempt_result == null) {
        await attempt.update({ status: "ended" });
        await attempt.reload();
        const timetaken =
          Math.round(new Date(attempt.updatedAt).getTime() / 1000) -
          Math.round(new Date(attempt.createdAt).getTime() / 1000);
  
        let data = {
          obtained_marks: final.toFixed(2) + "%",
          skipped: skipped,
          total_questions: arr.length,
          question_answered: correct + inCorrect,
          correct,
          inCorrect,
          timetaken,
          exam: { title: exam.exam },
        };
  
      
        attempt.update({ attempt_result: JSON.stringify(data) });
        if (data.obtained_marks > "35") {
          attempt.result = "pass";
          await attempt.save();
          await attempt.reload();
        } else {
          attempt.result = "fail";
          await attempt.save();
          await attempt.reload();
        }
      }
  
      if (attempt.attempt_result.obtained_marks <= "35") {
        return res.status(200).json({
          message: "you failed in this exam , your result",
          status: true,
          data: attempt.attempt_result,
          result: "fail",
        });
      }
      return res.status(200).send({
        status: true,
        data: attempt.attempt_result,
        message: "fetched successfully",
        result: "pass",
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
exports.getcertificate = async (req, res, next) => {

    console.log(req.body, 'req.body in download pdf');
    try {
      const attempt = await ExamAtempts.findOne({
        where: {
          examId: 1,
          traineeId: req.params.id,
        },
        include: User,
        order: [["createdAt", "DESC"]],
      });
      if (attempt.attempt_result.obtained_marks <= "35") {
        return res.status(200).json({
          message: "you failed in this exam , your result",
          status: true,
          data: attempt.attempt_result,
        });
      }
      const date = await ExamAtempts.findOne({
        where: {
          examId: 1,
          traineeId: req.params.id,
        },
        attributes: ["id", [Sequelize.fn("DATE", Sequelize.col("createdAt")), "createdAt"]],
      });
      const newdate = date.dataValues.createdAt.split("-");
      const newFormat = `${newdate[2]}-${monthNames[parseInt(newdate[1]) - 1]}-${newdate[0]}`;
      const pos = await User.findOne({ where: { id: req.params.id }, include: [Document, { model: Pos, as: "addedPos" }] })
      // return res.send(pos)
      let aadhar;
      let profile_picture;
      let pan;
      for (let i = 0; i < pos.documents.length; i++) {
        if (pos.documents[i].DocumentType == "pan_image") {
          pan = pos.documents[i].documentNumber
        }
        if (pos.documents[i].DocumentType == "aadhar_image") {
          aadhar = pos.documents[i].documentNumber
        }
        if (pos.documents[i].DocumentType == "profile_picture") {
          profile_picture = pos.documents[i].image
          
          console.log("*******" , pos.documents[i].image)
        }
  
      }
      console.log("pan/////////////", pan)
      const file = await generatePdf("views/newcertificate.ejs", {
        // const file = await htmlToPdfBuffer("views/newcertificate.ejs", {
          user: attempt.user.dataValues.name,
          date: newFormat,
          pan: pos.pan_number,
          aadhar: aadhar,
          address: `${pos.address ? pos.address : ""}${pos.address_2 ? pos.address_2+ "," : ""}`,
          profilePicture: profile_picture,
          userId: pos.addedPos.userName
      });
  
      // await sendAttachment(attempt.user.dataValues.email, "certificate of completion", [
      //   {
      //     content: file,
      //     filename: `${attempt.user.dataValues.name} certificate.pdf`,
      //     type: "application/pdf",
      //     disposition: "attachment",
      //   },
      // ]);
      console.log('file in pdf', file)
      return await res.contentType("application/pdf").send(file);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      // next(err);
    }
  };  

exports.getMarks = async (req, res, next) => {
    try {
      const marks = await ExamAtempts.findOne({ where: { traineeId: req.params.id }, order: [["createdAt", "DESC"]] });
      if (!marks) {
        return res.status(404).json({
          message: "No Exam Found",
          status: false,
        });
      }
      res.status(200).json({
        message: "Marks fetched",
        data: marks.attempt_result,
        status: true,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };