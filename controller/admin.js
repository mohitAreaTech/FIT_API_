const sequelize = require("../utils/database");
const { Op } = require("sequelize");
const { dataFound, dataNotFound } = require("../helper/functions");
const { UploadFile, removeFile, processAndSaveFiles } = require("../helper/multer");
const {Bank_name,  Pos, Customer, Issue, Leads, MISInsurance, Role, Motor, ExamAtempts, User, Document, Module, Department, Ticket, User_module, Bank, EndoresmentReason, Endoresment,MMVMaster, EndoresmentUser, Zone, Designation, District, State, Quotation, Question, SP, Notification, Head, NationalHead, Employee, StateHead, ZonalHead, DistrictHead, BranchHead, Permission, User_Permission, Branch ,LeadInsurance,LeadType, AddPolicyData} = require("../model");
const { sendEmail, send_notification } = require("../helper/certificate");
const {certificateMail, SendEmployeeIDPASS, SendPOSIDPASS } = require("../views/mailformat")
const bcrypt = require('bcryptjs');
const LeadsManagementForSubmitOffline = require("../model/LeadsManagement");
const GeneratedPolicy = require("../model/generated_policy");
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const previous_insurer_data = require("../model/previous_insurer_data");
// const moment = require('moment');


exports.getAllMake = async (req, res, next) => {
    // Goods Carrying, Miscellaneous, MotorBike, Passenger Carrying, Pvt Car, Scooter Trailer,
    const Vehicle_Type = req.body.Vehicle_Type;
    let where = { Vehicle_Type: Vehicle_Type };
    if (req.body.Vehicle_Type == "MotorBike") {
      where = {
        [Op.or]: [
          { Vehicle_Type: { [Op.eq]: "MotorBike" } },
          { Vehicle_Type: { [Op.eq]: "Scooter" } },
        ],
      };
    }
    try {
      const mmvMasters = await MMVMaster.findAll({
        group: ["Make"],
        where: where,
      });
      res.status(200).json({
        status: true,
        message: "All Make Fetched Successfully",
        data: mmvMasters,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.getAllModel = async (req, res, next) => {
    try {
      let where = { Make: req.body.make, Vehicle_Type: req.body.Vehicle_Type };
      if (req.body.Vehicle_Type == "MotorBike") {
        where = {
          Make: req.body.make,
          [Op.or]: [
            { Vehicle_Type: { [Op.eq]: "MotorBike" } },
            { Vehicle_Type: { [Op.eq]: "Scooter" } },
          ],
        };
      }
      console.log("where all model", where);
      const mmvMasters = await MMVMaster.findAll({
        where: where,
        group: ["Model"],
      });
      res.status(200).json({
        status: true,
        message: "All Model Fetched Successfully",
        data: mmvMasters,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.getAllVariants = async (req, res, next) => {
    try {
      let where = {
        Make: req.body.make,
        Model: req.body.model,
        Vehicle_Type: req.body.Vehicle_Type,
      };
      if (req.body.Vehicle_Type == "MotorBike") {
        where = {
          Make: req.body.make,
          Model: req.body.model,
          [Op.or]: [
            { Vehicle_Type: { [Op.eq]: "MotorBike" } },
            { Vehicle_Type: { [Op.eq]: "Scooter" } },
          ],
        };
      }
      const mmvMasters = await MMVMaster.findAll({
        where: where,
        // group: ["Variant"],
      });
  
      // console.log('mmvMaster in backend varient code: ---- ', mmvMasters);
      res.status(200).json({
        status: true,
        message: "All Variant Fetched Successfully",
        data: mmvMasters,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  

exports.BankNames = async (req, res, next) => {
    try {
       const bankName = await Bank_name.findAll();
       
       return res.status(200).json({
           message : "All Bank Names",
           status: true,
           data  : bankName
       })
    } catch (e) {
        next(e);
        console.log(e);
    }
}

exports.getZone = async (req, res, next) => {
    try {
        const zone = await Zone.findAll();
        return res.status(200).json({
            message: "Zone Feteched",
            data: zone,
            success: true
        })
    } catch (e) {
        next(e)
    }
}

exports.getState = async (req, res, next) => {
    try {
        const state = await State.findAll({ where: { zoneId: req.params.zoneId } });
        return res.status(200).json({
            message: "state Feteched",
            data: state,
            success: true
        })
    } catch (e) {
        next(e)
    }
}

exports.getPos = async (req, res, next) => {
    try {
        if (req.query.status) {
            const pos = await Pos.findAll({
                where: {
                    status: req.query.status
                }, include: [{ model: User, as: "addedPos", attributes: ["id", "name", "email", "phone"] },
                { model: User, as: "employee", attributes: ["id", "name", "email", "phone"] }]
            })

            return res.status(200).json({
                message: "Pos Fetched",
                data: pos,
                status: true
            })
        }
        if (req.query.poscode) {
            const pos = await Pos.findAll({
                attributes : ["username"],
                where: {
                }, include: [{ model: User, as: "addedPos", attributes: ["id", "name"] },
                { model: User, as: "employee", attributes: ["id", "name"] , include : [Employee] }]
            })

            return res.status(200).json({
                message: "Pos Fetched",
                data: pos,
                status: true
            })
        }
        const pos = await Pos.findAll({
            where: {
            }, include: [{ model: User, as: "addedPos", attributes: ["id", "name", "email", "phone"] },
            { model: User, as: "employee", attributes: ["id", "name", "email", "phone"] }]
        })

        res.status(200).json({
            message: "Pos Fetched",
            data: pos,
            status: true
        })

    } catch (err) {
        next(err)
    }
};

exports.getUser = async (req, res, next) => {
    try {
        if (req.query.type == "service-provider") {
            const user = await User.findAll({ where: { type: req.query.type }, include: [Document, Bank, { model: SP, as: "service_providers" , include : [Zone , District , State , {model : User ,as :"sp_pos" , include : {model : Pos ,as : "addedPos"}},{model : User ,as :"RM_ID" , include : {model : Employee ,as : "employee"}} ] }] });
            return res.status(200).json({
                message: "User fetched",
                data: user,
                status: true
            })
        }
        if (req.query.type) {
            const user = await User.findAll({ where: { type: req.query.type }, include: [{ model: Head, include: [State, Zone, District] }] });
            return res.status(200).json({
                message: "User fetched",
                data: user,
                status: true
            })
        }

        // if(req.query.status){
        //     const user = await employee.findAll({ where: { status: req.query.status }, include: [{ model: SP, as: "service_providers" , include : [Zone , District , State , {model : User ,as :"sp_pos" , include : {model : Pos ,as : "addedPos"}},{model : User ,as :"RM_ID" , include : {model : Employee ,as : "employee"}} ] }] });
        //     return res.status(200).json({
        //         message: "Active User fetched",
        //         data: user,
        //         status: true
        //     })
        // }

         

       if (req.query.status) {
            const employees = await Employee.findAll({
                where: { status: req.query.status }
            });
        
            return res.status(200).json({
                message: "Employees fetched based on status",
                data: employees,
                status: true
            });
        }
    
        

        const user = await User.findAll();
        res.status(200).json({
            message: "User fetched",
            data: user,
            status: true
        })


    } catch (err) {
        next(err)
    }
};

exports.createPos = async (req, res, next) => {
    const t = await sequelize.transaction()
    console.log(req.body, 'req.body in createPOs')
    try {
        const { file, body } = await UploadFile(req, "/document");
        console.log("req.body------------------------------------", req.body)
                console.log("req.body------------------------------------", file.length)

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { phone: req.body.phone },
                    {pan_number: req.body.pan_number},
                    {adhar_number: req.body.aadhar_number}
                ]
            }
        })

        console.log('pos user found by us', user)

        // dataFound(user, 400, "User exists")
        if(user){
          return res.status(400).json({
            message: "User exists"
          })
        }
        
        let address_2;
        if (req.body.address_3) {
             address_2 = (req.body.address_2 +", "+ req.body.address_3);
        } else {
            address_2 = req.body.address_2;
        }
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: `${Math.ceil((Math.random() + 1) * 10000000)}`,
            phone: req.body.phone,
            city: req.body.districtId,
            state: req.body.stateId,
            address: req.body.address,
            address_2: address_2,
            pan_number: req.body.pan_number,
            adhar_number: req.body.aadhar_number,
        })
        
        const doucmentArr = [];
        

        for (var i = 0; i < file.length; i++) {
            if (file[i].fieldname == "profile_picture") {
                await newUser.update({
                    profile_picture: file[i].path
                })
            }
            if (file[i].fieldname == "aadhar_front") {
                const newDocument = await Document.create(
                    {
                        documentNumber: body.aadhar_number,
                        DocumentType: "aadhar_image",
                        image: file[i].path,
                        userId: newUser.id,
                    },
                );
                file.map(async (e) =>  {
                    if (e.fieldname == "aadhar_back") {
                        newDocument.image_back = e.path;
                        await newDocument.save();
                    }
                });
                doucmentArr.push(newDocument);
            } else if (file[i].fieldname == "pan_image") {
                const newDocument = await Document.create(
                    {
                        documentNumber: body.pan_number,
                        DocumentType: "pan_image",
                        image: file[i].path,
                        userId: newUser.id,
                    },
                );
                doucmentArr.push(newDocument);
            } else if (file[i].fieldname == "marksheet_image") {
                const newDocument = await Document.create(
                    {
                        documentNumber: "marksheet",
                        DocumentType: "marksheet",
                        image: file[i].path,
                        userId: newUser.id,
                    },
                );
                doucmentArr.push(newDocument);
            } else if (file[i].fieldname == "passbook_cheque") {
                const newDocument = await Bank.create(
                    {
                        accountNumber: body.accountNumber,
                        ifsc: body.ifsc,
                        passbookOrCheque: file[i].path,
                        userId: newUser.id,
                        bank_name: req.body.bank_name
                    },
                );
                doucmentArr.push(newDocument);
            }
        }
        
        console.log("doucmentArr------------", doucmentArr)
        
        
         for (var i = 0; i < file.length; i++) {
      if (
        file[i].fieldname != "aadhar_front" ||
        file[i].fieldname != "aadhar_back" ||
        file[i].fieldname != "passbook_cheque" ||
        file[i].fieldname != "marksheet_image" ||
        file[i].fieldname != "pan_image" ||
        file[i].fieldname != "profile_picture"
      ) {
         console.log("-----------------------second looppp----",  file[i].fieldname )
        await Document.create({
          DocumentType: file[i].fieldname,
          image: file[i].path,
          userId: newUser.id,
        });
      }
    }

        const pos = await Pos.findOne({ order: [["id", "DESC"]] })
        let data = pos ? parseInt(pos.id + 1) : 1
        data = data.toString();
        data = data.padStart(4, '0');
        await Pos.create(
            {
                posId: newUser.id,
                userName: `FLASKIT${data}`,
                employeeId: req.body.employeeId,
                status: "pending",
                isTrainee: true,
                zoneId: req.body.zoneId,
                stateId: req.body.stateId,
                districtId: req.body.districtId,
                pincode: req.body.pincode
            },
            { transaction: t }
        );
        const module = await Module.findAll();
        const usermodules = await User_module.findOne({ where: { traineeId: newUser.id } })
        if (!usermodules) {
            const userModule = []
            for (let i = 0; i < module.length; i++) {
                const obj = {
                    traineeId: newUser.id,
                    moduleId: module[i].id
                }
                userModule.push(obj)
            }
            await User_module.bulkCreate(userModule)
        }

        let subject = `Welcome to Flask IT Solutions - Registration Confirmation`;
            let html = `<p>Dear ${req.body.name}</p>
            <p>Thank you for registering on Flask IT Solutions. We are excited to have you join us!</p>
            <p> Your account is being processed, and we're currently finalizing your login credentials. In a short while, you will receive an email 
            containing all the information of your login ID and password.</p>
            <p>If you have any questions or need further assistance, feel free to contact us.</p>
            <p>Best regards,<br>Flask IT Solutions</p>`
            await sendEmail(req.body.email, subject, html)

        // const html = SendPOSIDPASS(req.body.name, req.body.email, newUser.password, "POS",
        //     "start your training using the credentials given below")
        // await sendEmail(req.body.email, "Email & Password for Online Training Of Pos", html)

        // const hashedPassword = await bcrypt.hash(newUser.password, 10)

        // await newUser.update({
        //     password: hashedPassword
        // }, { transaction: t })


        console.log('newuser', newUser)

        res.status(201).json({
            message: "New Pos Created",
            data: newUser, doucmentArr,
            status: true
        })
        await t.commit();

    } catch (err) {
        await t.rollback()
        next(err)
        // console.log("error",err)
    }
}

exports.editUserDetails = async (req, res, next) => {
    try {
      const { file, body } = await UploadFile(req, "/document");
      console.log(
        "req.body -------------------------- editUserDetails api",
        req.body
      );
      console.log("file-------------", req.file);
      const user = await User.findOne({ where: { id: req.body.userId } });
  
      if (req.query.type === "pos") {
        await user.update({
          name: req.body.name,
          phone: req.body.phone,
          dob: req.body.dob,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
            email: req.body.email,
            adhar_number: req.body.adhar_number,
            pan_number : req.body.pan_number,
          // profile_picture: file[0].path
        });
        const pos = await Pos.findOne({ where: { posId: req.body.userId } });
        if (pos.status == "incomplete") {
          await pos.update({
            status: "pending",
            reject_remark: null,
          });
          }
          
        // console.log("edit user api ---------------------------------------",req.body)
      } else if (req.query.type == "document") {
        // console.log("1234567890-----------", req.body.id  )
        const doc = await Document.findOne({ where: { id: req.body.docId } });
        console.log("document-------------------------->>>", doc);
        if (file) {
          for (var i = 0; i < file.length; i++) {
              
            if (file[i].fieldname == "aadhar_front") {
              await removeFile(doc.image);
              await doc.update({
                documentNumber: body.aadhar_number,
                DocumentType: "aadhar_image",
                image: file[i].path,
              });
            } else if (file[i].fieldname == "aadhar_back") {
              await removeFile(doc.image_back);
              await doc.update({
                documentNumber: body.aadhar_number,
                DocumentType: "aadhar_image",
                image_back: file[i].path,
              });
            } else if (file[i].fieldname == "marksheet") {
              await removeFile(doc.image);
              await doc.update({
                documentNumber: "marksheet",
                DocumentType: "marksheet",
                image: file[i].path,
              });
            } 
            else if (file[i].fieldname == "profile_picture") {
              await removeFile(doc.image);
              await doc.update({
                documentNumber: "",
                DocumentType: "profile_picture",
                image: file[i].path,
              });
            } 
            else if (file[i].fieldname == "pan_image") {
              await removeFile(doc.image);
              await doc.update({
                documentNumber: body.pan_number,
                DocumentType: "pan_image",
                image: file[i].path,
              });
            }
          }
        }
        if (file.length == 0) {
          if (body.aadhar_number) {
            await doc.update({
              documentNumber: req.body.aadhar_number,
            });
          }
          if (body.pan_number) {
            await doc.update({
              documentNumber: req.body.pan_number,
            });
          }
        }
        const pos = await Pos.findOne({ where: { posId: doc.userId } });
        if (pos.status == "incomplete") {
          await pos.update({
            status: "pending",
            reject_remark: null,
          });
        }
      } else if (req.query.type == "bank") {
        const bank = await Bank.findOne({ where: { id: req.body.bankId } });
        if (file) {
          for (var i = 0; i < file.length; i++) {
            if (file[i].fieldname == "passbook_cheque") {
              await bank.update({
                accountNumber: body.accountNumber,
                bank_name: body.bank_name,
                ifsc: body.ifsc,
                passbookOrCheque: file[i].path,
              });
            }
          }
        }
        if (file.length == 0) {
          await bank.update({
            accountNumber: body.accountNumber,
            bank_name: body.bank_name,
            ifsc: body.ifsc,
          });
        }
  
        const pos = await Pos.findOne({ where: { posId: bank.userId } });
        if (pos.status == "incomplete") {
          await pos.update({
            status: "pending",
            reject_remark: null,
          });
        }
      }
  
      return res.status(200).json({
        message: "Data updated",
        data: user,
        status: true,
      });
      
    } catch (e) {
      next(e);
      console.log(e);
    }
  };

exports.addDocument = async (req, res, next) => {
    try {
      const { file, body } = await UploadFile(req, "/document");
      const document = await Document.findOne({
        where: {
          userId: req.body.id,
          DocumentType: req.body.DocumentType ? req.body.DocumentType : null,
        },
      });
      if (document) {
        return new Error("Document already added");
      }
      console.log(file, body);
      for (var i = 0; i < file.length; i++) {
        if (file[i].fieldname == "aadhar_front") {
          const newDocument = await Document.create({
            documentNumber: body.aadhar_number,
            DocumentType: "aadhar_image",
            image: file[i].path,
            userId: req.body.id,
          });
          file.map(async (e) => {
            if (e.fieldname == "aadhar_back") {
              newDocument.image_back = e.path;
              await newDocument.save();
            }
          });
        } else if (file[i].fieldname == "pan_image") {
          const newDocument = await Document.create({
            documentNumber: body.pan_number,
            DocumentType: "pan_image",
            image: file[i].path,
            userId: req.body.id,
          });
        } else if (file[i].fieldname == "marksheet") {
          const newDocument = await Document.create({
            documentNumber: "marksheet",
            DocumentType: "marksheet",
            image: file[i].path,
            userId: req.body.id,
          });
        } else if (file[i].fieldname == "passbookOrCheque") {
          const newDocument = await Bank.create({
            accountNumber: body.accountNumber,
            ifsc: body.ifsc,
            passbookOrCheque: file[i].path,
            userId: req.body.id,
            bank_name: req.body.bank_name,
          });
        } else if (file[i].fieldname == "profile_picture") {
          const newDocument = await Document.create({
            documentNumber: "",
            DocumentType: "profile_picture",
            image: file[i].path,
            userId: req.body.id,
          });
        }
      }
      return res.status(200).json({
        message: "Data Uploaded",
        status: true,
        data: document,
      });
    } catch (e) {
      next(e);
    }
  };

  exports.acceptOrRejectPos = async (req, res, next) => {
    try {
        const trainee = await Pos.findOne({ where: { posId: req.params.id }, include: { model: User, as: "addedPos" } })

        console.log('trainee', trainee);
        const pos = await Pos.findOne({
            where: {posId: req.params.id}
        })
        await trainee.update({
            status: req.body.status,
            reject_remark: req.body.remark
        })

        if (req.body.status == "rejected") {
            let subject = `Your POS Request is Rejected`;
            let html = `<p>Your POS Request is Rejected Due to the following Reason : 
            </p><br>${req.body.remark}`
            await sendEmail(trainee.addedPos.email, subject, html)
        }
        else if (req.body.status == "incomplete") {
            let subject = `Your POS Request is Pending due to Some Incomplete Document`;
            let html = `<p>Your POS Request is Pending due to Some Incomplete Document, The Document are Following : 
            </p><br>${req.body.remark}`
            await sendEmail(trainee.addedPos.email, subject, html)
        }

        if (req.body.status == "underTraining") {
            await trainee.update({
                isTrainee: true
            })

            await trainee.addedPos.update({
                password: `${Math.ceil((Math.random() + 1) * 10000000)}`,
            })

            const module = await Module.findAll();
            const usermodules = await User_module.findOne({ where: { traineeId: req.params.id } })

            const userModule = []
            for (let i = 0; i < module.length; i++) {
                const obj = {
                    traineeId: req.params.id,
                    moduleId: module[i].id
                }
                userModule.push(obj)
            }
            await User_module.bulkCreate(userModule)

            const html = SendPOSIDPASS(trainee.addedPos.name, trainee.addedPos.email, trainee.addedPos.password, "Pos",
                "Login using the credentials giver below")
            await sendEmail(trainee.addedPos.email, "Email & Password for Online Training Of Pos", html)

            const hashedPassword = await bcrypt.hash((trainee.addedPos.password).toString(), 10)

            await User.update({
                password: hashedPassword
            }, { where: { id: req.params.id } })
        }

        if (req.body.status === 'complete-training') {

           // calculate the end date by adding 48 hours 
            const endDate = new Date();
            const startDate = new Date(endDate.getTime() - 48 * 60 * 60 * 1000);
            
            // end date in ist 
            const endDateIST = new Date(endDate.getTime() + 5.5 * 60 * 60 * 1000);
            
            // Convert startDate to IST
            const startDateIST = new Date(startDate.getTime() + 5.5 * 60 * 60 * 1000);

            await trainee.update({
                isTrainee: false,
                status: 'underTraining',
                trainingStartedAt: startDateIST,
                trainingEndedAt: endDateIST,
                buttonVisibleTime: endDateIST.getTime() + 30 * 60 * 1000,
            }, {
                where: {
                    id: trainee.id
                }
            })
            const attempt = await ExamAtempts.create({
                traineeId: req.params.id,
                examId: 1,
                attempt_number: 1,
                status: "ended",
                result: "fail",
                attempt_result: `{"obtained_marks":"${Math.ceil(Math.random() * (Math.floor(Math.random() * 10)) + 39)}%","skipped":0,"total_questions":50,"question_answered":2,"correct":2,"inCorrect":0,"timetaken":2642,"exam":{"title":"POS Training EXam"}}`
            })

            trainee.save();
        }

        if (req.body.status === 'complete-exam') {

            const trainingEndDate = trainee.trainingEndedAt

            if (!trainingEndDate) {
                return res.status(500).json({
                    message: 'First Complete Training'
                })
            } else {

                const lastFilledCertifiedPosID = await sequelize.query(`
                    SELECT certifiedPosID
                    FROM pos
                    ORDER BY certifiedPosID DESC
                    LIMIT 1;
                `);

                console.log('last filed certifiedID', lastFilledCertifiedPosID)

                let newCertifiedID = (parseInt(lastFilledCertifiedPosID[0][0].certifiedPosID) + 1).toString();

                console.log('new certificate id', newCertifiedID)

                await trainee.update({
                    userName: `FLASKIT${newCertifiedID}`,
                    certifiedPosID: newCertifiedID,
                    isTrainee: false,
                    status: 'certified',
                    CertificationCompletedAt: new Date(trainingEndDate.getTime() + 0.8 * 60 * 60 * 1000),
                }, {where: {id: trainee.id}})

                await trainee.addedPos.update({
                    password: `FLASKIT@${Math.ceil((Math.random() + 1) * 100000)}`,
                })
    
                let subject = `Certificate of completion`;
                let html = await certificateMail(trainee.addedPos.name, trainee.addedPos.email,trainee.addedPos.password, trainee.addedPos.type, 'You are now a certified POS for Flask IT Solutions')
                await sendEmail(trainee.addedPos.email, subject, html)
                
                const hashedPassword = await bcrypt.hash((trainee.addedPos.password).toString(), 10)
                
                await trainee.addedPos.update({
                    password: hashedPassword
                }, { where: { id: req.params.id } })

                const attempt = await ExamAtempts.create({
                    traineeId: req.params.id,
                    examId: 1,
                    attempt_number: 1,
                    status: "ended",
                    result: "pass",
                    attempt_result: `{"obtained_marks":"${Math.ceil(Math.random() * (Math.floor(Math.random() * 10)) + 39)}%","skipped":0,"total_questions":20,"question_answered":7,"correct":7,"inCorrect":0,"timetaken":2642,"exam":{"title":"POS Training EXam"}}`
                });

                trainee.save();
            }
        }


        if (req.body.status == "certified") {
            await trainee.update({
                isTrainee: false
            })

            const attempt = await ExamAtempts.create({
                traineeId: req.params.id,
                examId: 1,
                attempt_number: 1,
                status: "ended",
                result: "pass",
                attempt_result: `{"obtained_marks":"${Math.ceil(Math.random() * (Math.floor(Math.random() * 10)) + 39)}%","skipped":0,"total_questions":20,"question_answered":7,"correct":7,"inCorrect":0,"timetaken":2642,"exam":{"title":"POS Training EXam"}}`
            })
        }


        
        res.status(200).json({
            message: "Pos Updated",
            status: true,
            data: trainee
        })
    } catch (err) {
        next(err)
    }
};

exports.getStates = async (req, res, next) => {
    try {
        const state = await State.findAll();
        return res.status(200).json({
            message: "state Feteched",
            data: state,
            status: true
        })
    } catch (e) {
        next(e)
    }
};

exports.getDistrict = async (req, res, next) => {
    try {
        const district = await District.findAll({ where: { stateId: req.params.stateId } });
        return res.status(200).json({
            message: "District Feteched",
            data: district,
            status: true
        })
    } catch (e) {
        next(e)
    }
};

exports.getDistricts = async (req, res, next) => {
    try {
        const district = await District.findAll({attributes : ["id" , "district"]});
        return res.status(200).json({
            message: "District Feteched",
            data: district,
            status: true
        })
    } catch (e) {
        next(e)
    }
};

exports.dashboardAdmin = async (req, res, next) => {
    try {
        const obj = {
            totalPos: await User.count({ where: { type: "pos" } }),
            POS_Req: await Pos.count({ where: { status: "pending" } }),
            under_training: await Pos.count({ where: { status: "underTraining" } }),
            certified: await Pos.count({ where: { status: "certified" } }),
            totalLeads: await Leads.count(),
            pendingLeads: await Leads.count({ where: { operantionalId: null } }),
            pendingMotorLeads: await Leads.count({ where: { operantionalId: null, leadtypeId: "1" } }),
            pendingMISLeads: await Leads.count({ where: { operantionalId: null, leadtypeId: "2" } }),
            GeneratedMISLeads: await Leads.count({ where: { status: "policy-generated", leadtypeId: "2" } }),
            generatedMotorLeads: await Leads.count({ where: { status: "policy-generated", leadtypeId: "1" } }),
            totalops: await User.count({ where: { type: "ops" } }),
            totalopsLeads: await Leads.count({ where: { status: "under-ops" } }),
            totalMis: await User.count({ where: { type: "mis" } }),
            totalemployee: await User.count({ where: { type: "employee" } }),
            totalTickets: await Ticket.count(),
            totalEndoresments: await EndoresmentUser.count(),
            totalMotorInsurance: await Motor.count(),
            totalMisInsurance: await MISInsurance.count()
        }

        res.status(200).json({
            message: "Dashboard",
            data: obj,
            status: true
        })
    } catch (e) { next(e) }
}

exports.search = async(req,res,next)=>{
    try {
        const user = await User.findAll({
            where : {
            type : {[Op.or] :  ["service-provider" , "pos"]} , 
            [Op.or] : [
            {name : {[Op.like] : `%${req.query.search}%`}},
            {email : {[Op.like] : `%${req.query.search}%`}},
            {phone : {[Op.like] : `%${req.query.search}%`}}
            ]
            },
            attributes : ["name", "id"],
            include : [{model  :Pos , as : "addedPos"} , {model : SP ,as : "service_providers" }]
        })
        return res.status(200).json({
            message : "Data Fetch",
            data : user,
            status : true
        })
    } catch (e) {
        next(e)
    }
}

//this funciton is for getting pos details
exports.getUserLeads = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [ExamAtempts, { model: Bank }, { model: Pos, as: "addedPos" }],
    });
    dataNotFound(user, 404, "User not found");
    // const orc = await Bank.findOne({
    //   where: { userId: req.params.id },
    // });
    // user.dataValues.orc = orc;
    if (user.type == "ops") {
      const lead = await Leads.findAll({
        where: { operantionalId: req.params.id },
        include: { model: Customer, include: Motor },
      });
      const obj = {
        leads: lead,
        user: user,
      };
      return res.status(200).json({
        message: "Lead Fetched",
        data: obj,
        status: true,
      });
    }
    if (user.type == "pos") {
      const documents = await Document.findAll({
        where: { userId: req.params.id }, order : [["id", "DESC"]]
      });
      user.dataValues.marksheet = 0;
      user.dataValues.aadhar = 0;
      user.dataValues.pan = 0;
      for (var i = 0; i < documents.length; i++) {
        if (documents[i].DocumentType == "aadhar_image") {
          user.dataValues.aadhar = documents[i];
        } else if (documents[i].DocumentType == "pan_image") {
          user.dataValues.pan = documents[i];
        } else if (documents[i].DocumentType == "marksheet") {
          user.dataValues.marksheet = documents[i];
        }
        if (documents[i].DocumentType == "profile_picture") {
          user.dataValues.profile_picture = documents[i];
        }
      }
      const bank = await Bank.findOne({
        where: { userId: req.params.id, },
      });
      const leads = await Leads.findAll({
        where: { posId: req.params.id },
        include: [
          { model: User, as: "pos" },
          { model: User, as: "ops" },
          {
            model: Customer,
            include: [MISInsurance, { model: Motor, include: Quotation }],
          },
        ],
      });
      const obj = {
        leads,
        // bank,
        user: user,
      };
      return res.status(200).json({
        message: "Lead Fetched",
        data: obj,
        status: true,
      });
    }
    if (user.type == "service-provider") {
      const documents = await Document.findAll({
        where: { userId: req.params.id },
      });
      user.dataValues.marksheet = 0;
      user.dataValues.aadhar = 0;
      user.dataValues.pan = 0;
      for (var i = 0; i < documents.length; i++) {
        if (documents[i].DocumentType == "aadhar_image") {
          user.dataValues.aadhar = documents[i];
        } else if (documents[i].DocumentType == "pan_image") {
          user.dataValues.pan = documents[i];
        } else if (documents[i].DocumentType == "marksheet") {
          user.dataValues.marksheet = documents[i];
        }
      }
      const leads = await Leads.findAll({
        where: { posId: req.params.id },
        include: [
          { model: User, as: "pos" },
          { model: User, as: "ops" },
          {
            model: Customer,
            include: [MISInsurance, { model: Motor, include: Quotation }],
          },
        ],
      });
      const obj = {
        leads,
        user: user,
      };

      return res.status(200).json({
        message: "Lead Fetched",
        data: obj,
        status: true,
      });
    }
    if (user.type == "employee") {
      const documents = await Document.findAll({
        where: { userId: req.params.id },
      });
      user.dataValues.marksheet = 0;
      user.dataValues.aadhar = 0;
      user.dataValues.pan = 0;
      for (var i = 0; i < documents.length; i++) {
        if (documents[i].DocumentType == "aadhar_image") {
          user.dataValues.aadhar = documents[i];
        } else if (documents[i].DocumentType == "pan_image") {
          user.dataValues.pan = documents[i];
        } else if (documents[i].DocumentType == "marksheet") {
          user.dataValues.marksheet = documents[i];
        }
      }
      const leads = await Leads.findAll({
        where: { posId: req.params.id },
        include: [
          { model: User, as: "pos" },
          { model: User, as: "ops" },
          {
            model: Customer,
            include: [MISInsurance, { model: Motor, include: Quotation }],
          },
        ],
      });
      const obj = {
        leads,
        user: user,
      };
      return res.status(200).json({
        message: "Lead Fetched",
        data: obj,
        status: true,
      });
    }
    if (user.type == "mis") {
      const lead = await Leads.findAll({
        where: { posId: req.params.id },
        include: [
          { model: Customer },
          { model: LeadInsurance, include: MISInsurance },
        ],
      });
      const obj = {
        leads: lead,
        user: user,
      };
      return res.status(200).json({
        message: "Lead Fetched",
        data: obj,
        status: true,
      });
    }
  } catch (err) {
    next(err);
  }
};

// fill policy details
exports.fillPolicyDetails = async (req, res, next) => {
    try {

        

    } catch (err) {
        console.log('Error in Filling Policy Data', err);
      res.status(500).json({
        success: false,
        message: 'Error in Filling Policy Data'
      });

      next(err);
    }
}

// leads management
exports.submitOfflinePolicyData = async (req, res, next) => {
    try { 

      const { file, body } = await UploadFile(req, '/document');
      console.log('files:::', file);
      console.log('body :::::', body);
      console.log('file type of file', typeof (file));
      console.log('length of flilsd', file.length);


      const parsedCustomerDetails = JSON.parse(body.customerDetails);
      console.log("parsedCustomer 1", parsedCustomerDetails);

      const parsedVehicleDetails = JSON.parse(body.vehicleDetails);
      console.log('parsead 2', parsedVehicleDetails);

      const parsedPosData = JSON.parse(body.pos_data);
      console.log('parsed 3', parsedPosData);
      console.log('parsee sdfasfd', parsedCustomerDetails.customerName);

      if (body.userType === 'pos') {
          
        const existingPolicyData = await AddPolicyData.findAll({
          where: { vehicleNumber: parsedVehicleDetails.vehicleNumber }
      });
    
    console.log("existing policy", existingPolicyData.length);

      if (existingPolicyData.length != 0) {
          return res.status(500).json({
              success: false,
              message: 'Policy With This Registration Number already exists!!!',
              data: existingPolicyData
          });
        };

        let currentIssuePolicy;
        let rcFront;
        let rcBack;
        let previousPolicy;
        let salesLetter;
        let otherDocument;
        
        for (let i = 0; i < file.length; i++){
          console.log(i, 'i in files');

          if (file[i].fieldname === 'currentIssuedPolicy') {
            console.log('curretn path', file[i].path);
              currentIssuePolicy  =  file[i].path
          }

          if (file[i].fieldname === 'rcFront') {
            console.log('rc front path', file[i].path);
            rcFront = file[i].path
          }

          if (file[i].fieldname === 'previousPolicy') {
            console.log('previous poli path', file[i].path);
            previousPolicy = file[i].path
          }

          if (file[i].fieldname === 'rcBack') {
            console.log('rc back path', file[i].path);
              rcBack = file[i].path
          }

          if (file[i].fieldname === 'salesLetter') {
            console.log('sales letter path', file[i].path);
            salesLetter = file[i].path
          }

          if (file[i].fieldname === 'otherDocument') {
            otherDocument = file[i].path
          }
        }

          let totalLeads = await LeadsManagementForSubmitOffline.count();
          console.log('Total Leads: ', totalLeads);
        
            const newPolicyData = await AddPolicyData.create({
                policyUniqueId: body.UniquePolicyId,
                customerFullName: parsedCustomerDetails.customerName,
                customerNumber: parsedCustomerDetails.customerMobileNumber,
                customerEmailAddress: parsedCustomerDetails.customerEmailAddress,
                customerPincode: parsedCustomerDetails.customerPincode,
                customerCity: parsedCustomerDetails.customerCity,
                customerState: parsedCustomerDetails.customerState,
                vehicleNumber: parsedVehicleDetails.vehicleNumber,
                vehicleMake: parsedVehicleDetails.vehicleMake,
                vehicleModel: parsedVehicleDetails.vehicleModel,
                vehicleVariant: parsedVehicleDetails.vehicleVariant,
                caseType: parsedVehicleDetails.caseType,
                policyType: parsedVehicleDetails.policyType,
                vehicleCategory: parsedVehicleDetails.vehicleCategory,
                pos_data: parsedPosData,
                currentInsuerName: parsedVehicleDetails.currentInsurer,
                policy_number: parsedVehicleDetails.policy_number,
                currentIssuedPolicyDocument: currentIssuePolicy,
                previousYearPolicydocument: previousPolicy,
                rc_front_document: rcFront,
                rc_back_document: rcBack,
                form_29_document: salesLetter,
                other: otherDocument
            });
            
       

        console.log('new policy data', newPolicyData);
        

            // create lead in db and send this to MIS from pos
           await LeadsManagementForSubmitOffline.create({
                lead_type: 'offline_SubmitPolicy',
                lead_id: totalLeads++,
                lead_generatedBy: 'POS',
                lead_generated_for: 'MIS',
                lead_status: 'requestGenerated',
                lead_pending_at: 'MIS',
                lead_data: newPolicyData,
                posData: parsedPosData
           });
            
      
           
            res.status(200).json({
                success: true,
                message: 'Lead Generated Successfully!!!',
                data: newPolicyData,
            })

        } 
    } catch (err) {
        console.log('Error in Leads management', err);
      res.status(500).json({
        success: false,
        message: 'Error in Leads Management'
      });
      next(err);
    }
}

exports.submitOfflinePolicyDataMIS = async (req, res, next) => {
  try {

    if (req.body.userType === 'MIS') {

      const policyData = await AddPolicyData.findOne({
          where: { policyUniqueId: req.body.UniquePolicyId }
      });

      // update policy data 
    const newUpdatedData = await policyData.update({
          policyUniqueId: req.body.UniquePolicyId,
          customerFullName: req.body.customerName,
          customerNumber: req.body.customerMobileNumber,
          customerEmailAddress: req.body.customerEmailAddress,
          customerPincode: req.body.customerPincode,
          customerCity: req.body.customerCity,
          customerState: req.body.customerState,
          vehicleNumber: req.body.vehicleDetails.vehicleNumber,
          vehicleMake: req.body.vehicleMake,
          vehicleModel: req.body.vehicleModel,
          vehicleVariant: req.body.vehicleVariant,
          caseType: req.body.caseType,
          policyType: req.body.policyType,
          vehicleCategory: req.body.vehicleCategory,
          fuel_type: req.body.fuelType,
          sitting_capacity: req.body.sitting_capacity,
          vehicle_idv: req.body.vehicle_idv,
          vehicle_ncb: req.body.vehicle_ncb,
          engine_number: req.body.engine_number,
          chassis_number: req.body.chassis_number,
          cubic_capacity: req.body.cubic_capacity,
          policyStatus: req.body.policyStatus,
          manufacturing_Date: req.body.manufacturing_Date,
          registration_date: req.body.registration_date,
          policy_issued_date: req.body.policy_issued_date,
          policy_start_date: req.body.policy_start_date,
          policy_end_date: req.body.policy_end_date,
          policy_number: req.body.policy_number,
          CPA: req.body.cpa,
          od_net_premium: req.body.od_net_premium,
          tp_premium: req.body.tp_premium,
          net_premium: req.body.net_premium,
          gst_Tax_amount: req.body.gst_Tax_amount,
          final_premium: req.body.final_premium,
          MIS_employeeData: req.body.MIS_employee_data,
          policy_type: 'offline',
          editedBy: req.body.assignedMisName,
          insurerName: req.body.insurerName,
          currentInsurer: req.body.currentInsurer
      });

      const existingLead = await LeadsManagementForSubmitOffline.findOne({
          where: { lead_id: req.body.leadId }
      });

      existingLead.update({
          lead_status: 'policyGenerated',
          lead_data: newUpdatedData,
          misData: req.body.MIS_employee_data,
      });

      // save this in total policies
      await GeneratedPolicy.create({
        pos_name: policyData.pos_data.name,
        policyNumber: req.body.policy_number,
        insuranceCompany: req.body.isurerName,
        MobileNumber: req.body.customerMobileNumber,
        customerName: req.body.customerName,
        policyType: "offline",
        PolicyGeneratedDate: moment().format('DD-MM-YYYY'),
        policy_issued_pos: policyData.pos_data,
        policyData: newUpdatedData,
        misData: req.body.MIS_employee_data,
        lead_id: req.body.leadId
      });


      res.status(200).json({
          success: true,
          message: 'Policy Generated Successfully!',
          data: newUpdatedData
      });
  }

    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in updating data',
    })
  }
}

// assing to me 
exports.assignToMISLeads = async (req, res, next) => {
    try {
        
      console.log('params', req.params.id);
        const pendingLeads = await LeadsManagementForSubmitOffline.findOne({
            where: { lead_id: req.params.id }
        });

        if (!pendingLeads) {
            res.status(500).json({
                success: false,
                message: 'Not able to Find Leads!!'
            });
        }

        // pending leads status assigned to particaular MIS 
        pendingLeads.update({
            lead_status: 'leadAccepted',
            lead_assignedTo: req.body.misEmployeeId
        });

        res.status(200).json({
            success: true,
            message: 'Leads Assign Successfully !!',
            data: pendingLeads
        });

    } catch (err) {
        console.log('Error in Assigning Leads to MIS', err);
        res.status(500).json({
            success: false,
            message: 'Error in Assigning Leads to MIS'
        })
      next(err);
    }
}

// this is used for pending pool 
exports.pendingPool = async (req, res, next) => {
    try {

        const allPendingLeads = await LeadsManagementForSubmitOffline.findAll({
            where: { lead_status: 'requestGenerated', }
        });

        return res.status(200).json({
            success: true,
            message: 'All Pending Leads Fetched!!',
            data: allPendingLeads,      
        })
      
    } catch (err) {
        console.log('Error in Getting Pending Pool', err);
      res.status(500).json({
        success: false,
        message: 'Error in Getting Pending Pool'
      });
      next(err);
    }
}

// this function is used for my pool
exports.myPool = async (req, res, next) => {
    try {

        const assignedLeads = await LeadsManagementForSubmitOffline.findAll({
            where: { lead_status: 'leadAccepted', lead_assignedTo: req.body.misEmployeeId }
        });
        
        const employeeDetails = await Employee.findOne({
            where: { username: req.body.misEmployeeId }
        });

        const employeeName = employeeDetails.name;

        console.log('assigned Leads', assignedLeads);

        res.status(200).json({
            success: true,
            message: `Assigned leads to ${employeeName}`,
            data: assignedLeads
        });
        
    } catch (err) {
        console.log('Error in Getting My Pool', err);
        res.status(500).json({
          success: false,
          message: 'Error in Getting My Pool'
        });
      next(err);
    }
}

// filter employee
exports.filterEmployee = async (req, res, next) => {
  try {
  } catch (err) {
    console.log('Error in Filter of Employee', err);
    res.status(500).json({
      success: false,
      message: "Error in Filtering Employee",
    })
    next(err);
  }
}

// previous insurer data
exports.getPreviousInsurers = async (req, res, next) => {
  try {
    const insurer = await previous_insurer_data.findAll();

    // console.log('Previous insurer all data', insurer);

    res.status(200).json({
      status: true,
      message: "All Previous Insurers Fetched Successfully",
      data: insurer,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.generatedPolicyData = async (req, res, next) => {
  try {

    const allPolicy = await GeneratedPolicy.findAll();

    res.status(200).json({
      success: true,
      message: 'All Generated Policies Fetched!!',
      data: allPolicy
    });
    
  } catch (err) {
    console.log('Error in getting Generated Policies', err);
    res.status(500).json({
      success: false,
      message: "Error in Getting Policy Data",
    });
    next(err);
  }
}