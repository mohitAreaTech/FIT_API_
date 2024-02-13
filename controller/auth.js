require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require("../model/Employe");
const secretKey = process.env.secretKey;
const User = require('../model/User')
const Pos = require('../model/pos')
const { sendEmail } = require('../helper/certificate');

exports.login = async (req, res, next) => {
    try {

        const { emailAddress, password } = req.body;

        const user = await Employee.findOne({
            where: { email: emailAddress }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Employee Does not Exist!!!'
            })
        };

        if (user.status === 'deactive') {
            return res.status(400).json({
                success: false,
                message: 'You are not allowed to Login, Please Contact with Administrator!!!',
                data: user
            });
        };
   
        console.log('user password', user.password);
        console.log('current password', password);

        const isPasswordCorrect = bcrypt.compare(password, user.password);

        console.log('is password correct', isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }
        
        // Generate a JWT token
        const token = jwt.sign({ email: user.email, password: user.password }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            accessToken: token,
            data: user,
            role: user.role
        });

        
    } catch (err) {
        console.log('Error in Login Customer', err);
        res.status(500).json({
            success: false,
            message: 'Error In login Employee',
        })
    }
}

exports.becomeAPos = async (req, res, next) => {
    try {
  
      console.log('become a pos req.body', req.body)
      const { file, body } = await UploadFile(req, "/profile_picture");
      const schema = joi
        .object({
          email: joi.string().min(4).email().required(),
          name: joi.string().min(3).required(),
          phone: joi.string().min(9).required(),
        })
        .options({ allowUnknown: true });
  
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0]);
      }
      const user = await User.findOne({ where: { [Op.or]: [{ phone: req.body.phone }, { email: req.body.email }] } });
      console.log(user, 'user ')
      dataNotFound(!user, 400, "user exists");
      console.log(file)
      const newPos = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password : `${Math.ceil(Math.random() * 1908765)}`,
        // profile_picture : file.length > 0 ? file[0].path : null,
        address : req.body.address
      });
      
      const pos= await Pos.findOne({order : [["id" , "DESC"]]})
      let data =pos ? pos.id +1  : 1
          data = data.toString();
          data = data.padStart(4, '0');
       await Pos.create(
        {
          isTrainee: true,
          posId: newPos.id,
          userName: `RIB${data}`,
          employeeId : req.body.employeeId,
          pincode  :req.body.pincode
        },
      );
      res.status(200).json({
        message: "Data inserted",
        status: true,
        data: newPos,
      });
    } catch (err) {
      console.log(err, 'err in become a pos')
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.createPos = async (req, res, next) => {
    try {
      const { file, body } = await UploadFile(req, '/document')
      const user = await User.findOne({ where: { id: req.params.id } });
      dataNotFound(user, 404, "no user found");
      const document = await Document.findAll({ where: { userId: req.params.id } });
      if (document.length == 3) {
        return res.status(400).json({
          message: "document already submitted",
          status: false,
        });
      }
      const doucmentArr = [];
  
      for (var i = 0; i < file.length; i++) {
        if (file[i].fieldname == "aadhar_front") {
          const newDocument = await Document.create(
            {
              documentNumber: body.aadhar_number,
              DocumentType: "aadhar_image",
              image: file[i].path,
              userId: user.id,
            },
          );
          file.map(async (e) => {
            if (e.fieldname == "aadhar_back") {
              newDocument.image_back = e.path;
              await newDocument.save();
              await newDocument.reload();
            }
          });
          doucmentArr.push(newDocument);
        } else if (file[i].fieldname == "pan_image") {
          const newDocument = await Document.create(
            {
              documentNumber: body.pan_number,
              DocumentType: "pan_image",
              image: file[i].path,
              userId: user.id,
            },
          );
          doucmentArr.push(newDocument);
        } else if (file[i].fieldname == "marksheet_image") {
          const newDocument = await Document.create(
            {
              documentNumber: "marksheet",
              DocumentType: "marksheet",
              image: file[i].path,
              userId: user.id,
            },
          );
          doucmentArr.push(newDocument);
        } else if (file[i].fieldname == "passbook_cheque") {
          const newDocument = await Bank.create(
            {
              accountNumber: body.accountNumber,
              ifsc: body.ifsc,
              passbookOrCheque: file[i].path,
              userId: user.id,
              bank_name : req.body.bank_name
            },
          );
          doucmentArr.push(newDocument);
        }
        else{
            const newDocument = await Document.create({
               DocumentType: file[i].fieldname,
              image: file[i].path,
            })
            doucmentArr.push(newDocument);
        }
      }
      const state = await State.findOne({where :{id : req.body.stateId}})
      await Pos.update({
          zoneId : req.body.zoneId ? req.body.zoneId : state.zoneId,
          stateId : req.body.stateId,
          districtId : req.body.districtId,
          branchId : req.body.branchId,
      },{where:{posId : req.params.id}})
     const admin = await User.findOne({where : {type : "admin"}})
          await send_notification(admin.fcm_token , "Flaskit Solutions" , "New Pos Added")
          await Notification.create({
              
              userId : admin.id,
              message : "New Pos Added"
          })
  
      res.status(201).json({
        message: "Thankyou For Registering with Us, We will notify you through Mail If your request is Aceept or Reject",
        data: user,
        documents: doucmentArr,
        status: true,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.uploadProfilePicture = async (req,res,next)=>{
    try {
        const user = await User.findOne({where :{id : req.userId}});
        const { file, body } = await UploadFile(req, "/profile_picture");
        if(user.profile_picture){
            await removeFile(user.profile_picture)
            await user.update({
                profile_picture : file[0].path
            })
        }
        else{
        await user.update({
                profile_picture : file[0].path
            })
        }
        res.status(201).json({
            message : "Profile Picture Updated",
            status : true
        })
    } catch (e) {next(e)}
}

//pos login
exports.posLogin = async (req, res, next) => {
  const { emailAddress, password, phone } = req.body;
  console.log(emailAddress,password)
  try {
    // const schema = joi
    //   .object({
    //     email: joi.string().min(4).email(),
    //     password: joi.string().min(6).required(),
    //     phone: joi.number().min(8),
    //   })
    //   .options({ allowUnknown: true });

    // const { error } = schema.validate(req.body);
    // if (error) {
    //   return res.status(400).send(error.details[0]);
    // }

      const user = await User.findOne({ where: { email: emailAddress } , include : [{model  : Pos , as : "addedPos"}] });
    console.log(user, 'user found');
    
      const match = await bcrypt.compare(password, user.password);
    // dataNotFound(user, 404, "No email found");
    
     
      if(!match){
        return res.status(400).json({
          message: 'password is incorrect',

        })
      }
        if(user.type == "pos"){
          const pos = await Pos.findOne({where : {posId : user.id}})

            // if user is under training than this condition will apply
            if(pos.status != "certified" ){

              const token = jwt.sign(
                {
                  userId: user.id,
                  email: user.email
                },
                process.env.Secret
              );
                user.access_token = token;
                user.fcm_token =req.body.fcm_token;
               await user.save();
               await user.reload();

                return res.status(200).json({
                    message : "You are underTraining, Please Clear Module",
                    status : true,
                    data: user,
                })
            }
        }
      if (user.isFirstLoggedIn == true && user.password == null) {
        const hashedPassword = await bcryptjs.hash(req.body.password, 12);

        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.Secret
        );

        user.access_token = token;
        user.isVerified = true
        user.password = hashedPassword;
        user.isFirstLoggedIn = false;
        user.fcm_token = req.body.fcm_token;
        await user.save();

        return res.send({
          message: "password set for new user",
          data: user,
          status: true,
        });
      } else {
        const match = await bcrypt.compare(password, user.password);
        // dataNotFound(match, 400, "Incorrect Password");

        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.secretKey
        );

        user.access_token = token;
        user.isVerified = true;
        user.fcm_token = req.body.fcm_token;
        await user.save();
        await user.reload();

        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        delete user.dataValues.updatedAt;

        res.status(200).json({
          message: "user logged in",
          status: true,
          data: user,
        });
      }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.forgetPassword = async(req,res,next)=>{
  try {
      const email = await User.findOne({where : {email : req.body.email}});
      dataNotFound(email , 404 , "Email Not Found")
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const html = `<!DOCTYPE html>
          <html lang="en">
          <body>
          <h4>Hello ${email.name}</h4>   <br>    <h5>Here is your FORGET PASSWORD OTP ${OTP}    
      </body>
      </html> `
      await sendEmail(req.body.email , "Forget Password" ,html )
      await email.update({
          access_token : OTP
      })
      res.status(200).json({
          message :"Email Sent",
          status : true
      })
      
  } catch (e) {next(e)}
};

exports.resetPassword = async(req,res,next)=>{
  try {
     const email = await User.findOne({where : {email : req.body.email}});
      dataNotFound(email , 404 , "Email Not Found")
      if(email.access_token == req.body.otp){
          const hashedPassword = await bcrypt.hash(req.body.password , 10)
          await email.update({
              password : hashedPassword
          })
          return res.status(200).json({
              message : "Password Reset successfully",
              data : email,
              status : true
          })
      }
      res.status(400).json({
          message : "Invalid OTP",
          status : false
      })
  } catch (e) {next(e)}
}