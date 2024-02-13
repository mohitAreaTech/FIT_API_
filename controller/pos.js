const { dataNotFound, dataFound } = require("../helper/functions");
const {
    User,
    Customer,
    Leads,
    Pos,
    ExamAtempts, Bank,
    LeadType,
    Document,
    Motor,
    LeadInsurance,
    MISInsurance,
    MMVMaster,
    Addons,
    PreviousInsurer,
    Pincode,
    RTO,
    Nominee,
    PolicyDocs,
    Quotation,
    Transaction,
    Notification,
} = require("../model");
const { UploadFile, removeFile } = require("../helper/multer");
const joi = require("joi");
const { Op } = require("sequelize");
const sequelize = require("../utils/database");
const MisInsurance = require("../model/mis-insurance");
const lead = require("../model/leads");
const { sendEmail, send_notification } = require("../helper/certificate");


(async function myfun (){
    const user = await Pos.findAll({include : {model : User , as : "addedPos"}})
    for (var i = 0; i < user.length; i++) {
       let pos = user[i]
       if(!pos.dataValues.addedPos){
           console.log("INTHIS CONDITION")
           await pos.destroy()
       }
    }
})

exports.updateLead = async (req, res, next) => {
    try {
        const { file, body } = await UploadFile(req, "/asset")
        const lead = await Motor.findOne({ where: { id: req.body.id } })
        dataNotFound(lead, 404, "lead not found")
        const updateMotor = await lead.update({
            vehicle_type: body.vehicle_type,
            case_type: req.body.case_type,
            policy_type: req.body.policy_type,
            vehicle_no: body.vehicle_no,
            vehicle_make: body.vehicle_make,
            vehicle_model: body.vehicle_model,
            fuel_type: body.fuel_type,
            vehicle_variant: body.vehicle_variant,
            vehicle_mfg_yr: body.vehicle_mfg_yr,
            registration_date: req.body.registration_date,
            gaskit_status: body.gaskit_status,
            gaskit_outside: body.gaskit_outside,
            gaskit_installed: body.gaskit_installed,
            rto: req.body.rto,
            rm_name_Code: body.rm_name_Code,
            policy_status: body.policy_status,
            required_add_on: body.required_add_on,
            required_insurance_company: req.body.required_insurance_company,
            require_idv: req.body.require_idv,
            require_discount: req.body.require_discount,
            expected_final_premium: req.body.expected_final_premium,
            previous_policy_add_on: req.body.previous_policy_add_on,
            previous_policy_insurance_company: req.body.previous_policy_insurance_company,
            previous_policy_idv: req.body.previous_policy_idv,
            previous_policy_discount: req.body.previous_policy_discount,
            policy_status: req.body.policy_status,
            remarks: req.body.remark,
            od_net_premium: req.body.od_net_premium,
            tp_cover: req.body.tp_cover,
            addons: req.body.addons,
            cc_gcv_str: req.body.cc_gcv_str,
            insurance_branch: req.body.insurance_branch,
            broker_name: req.body.broker_name,
            remark_internal_ops: req.body.remark_internal_ops
        })
        const updateLead = await Leads.findOne({ where: { customerId: lead.customerId } });
        await updateLead.update({
            status: "under-ops",
            remark: null
        })
        const customer = await Customer.findOne({ id: lead.customerId });
        const html = `hello ${customer.name} , your policy data updated Successfully`
        await sendEmail(customer.email, "Your Policy Data Updated", html)
        return res.status(200).json({
            data: lead,
            status: true,
            message: "leads Fetched"
        })
    } catch (e) {
        next(e)
    }
}

exports.getCustomerLead = async (req, res, next) => {
  try {
    const lead = await LeadInsurance.findOne({
      where: { id: req.params.id },
      include: [{ model: Motor, include: [{ model: MMVMaster }, { model: Customer }] }],
    });

    return res.status(200).json({
      message: "Leads Fetched",
      data: lead,
      status: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateCustomerDetail = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({ where: { id: req.body.id } })
        const newCustomer = await customer.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
            email: req.body.email,
            pincode: req.body.pincode,
            dob: req.body.dob,
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            address_line3: req.body.address_line3,
            pan_card: req.body.pan_card,
            aadhar_card: req.body.aadhar_card,
            gender: req.body.gender,
            marital_status: req.body.marital_status,
            occupation: req.body.occupation,
            nominee_name: req.body.nominee_name,
            nominee_relation: req.body.nominee_relation,
            nominee_age: req.body.nominee_age,
            appointee_name: req.body.appointee_name,
            appointee_relation: req.body.appointee_relation,
        })
        const updateLead = await Leads.findOne({ where: { customerId: req.body.id } });
        await updateLead.update({
            status: "under-ops",
            remark: null
        })
        const html = `hello ${customer.name} , your policy data updated Successfully`
        await sendEmail(customer.email, "Your Policy Data Updated", html)
        return res.status(200).json({
            data: customer,
            status: true,
            message: "leads Fetched"
        })
    } catch (e) {
        next(e)
    }
}

exports.getMyLeads = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.userId } })
        const startDate = `${req.query.month}-01`
        const endDate = new Date(`${req.query.month}-31 23:59:59:0000`)
        if (user.type == "ops") {
            if (req.query.status) {
                if (req.query.status == "pending" || req.query.status == "under-ops156") {
                    const leads = await Leads.findAll({
                        where: {
                            status: { [Op.or]: ["pending", "under-ops"] },
                            operantionalId: req.userId,
                            createdAt: {
                                [Op.gte]: startDate,
                                [Op.lte]: endDate
                            }
                        },
                        include: [
                            PolicyDocs, LeadType, Transaction, Quotation, Customer,
                            { model: LeadInsurance, include: [Motor, MISInsurance] }
                        ],
                        order: [["id", "DESC"]]
                    })
                    return res.status(200).json({
                        data: leads,
                        status: true,
                        message: "leads Fetched"
                    })
                }
                else if (req.query.status != "pending") {
                    console.log("qwetu234567")

                    const leads = await Leads.findAll({
                        where: {
                            operantionalId: req.userId, createdAt: {
                                [Op.gte]: startDate,
                                [Op.lte]: endDate
                            }, status: req.query.status
                        }, order: [["id", "DESC"]], include: [PolicyDocs, LeadType, Customer, Transaction, Quotation, { model: LeadInsurance, include: [Motor, MISInsurance] }]
                    })
                    return res.status(200).json({
                        data: leads,
                        status: true,
                        message: "leads Fetched"
                    })
                }
            }
            else {
                console.log("qwet234565432356u")

                const leads = await Leads.findAll({
                    where: {
                        operantionalId: req.userId,
                        createdAt: {
                            [Op.gte]: startDate,
                            [Op.lte]: endDate
                        },
                    },
                    include: [
                        PolicyDocs, LeadType, Customer, Transaction,
                        { model: LeadInsurance, include: [Motor, MISInsurance] }
                    ],
                    order: [["id", "DESC"]]
                })
                return res.status(200).json({
                    data: leads,
                    status: true,
                    message: "leads Fetched"
                })
            }
        }
        else {
            if (req.query.status) {
                if (req.query.status == "pending" || req.query.status == "under-ops156") {
                    const leads = await Leads.findAll({
                        where: {
                            status: { [Op.or]: ["pending", "under-ops"] },
                            posId: req.userId,
                            createdAt: {
                                [Op.gte]: startDate,
                                [Op.lte]: endDate
                            }
                        },
                        include: [
                            PolicyDocs, LeadType, Transaction, Quotation, Customer,
                            { model: LeadInsurance, include: [Motor, MISInsurance] }
                        ],
                        order: [["id", "DESC"]]
                    })
                    return res.status(200).json({
                        data: leads,
                        status: true,
                        message: "leads Fetched"
                    })
                }
                else if (req.query.status != "pending") {
                    console.log("qwetu234567")

                    const leads = await Leads.findAll({
                        where: {
                            posId: req.userId, createdAt: {
                                [Op.gte]: startDate,
                                [Op.lte]: endDate
                            }, status: req.query.status
                        }, order: [["id", "DESC"]], include: [PolicyDocs, LeadType, Customer, Transaction, Quotation, { model: LeadInsurance, include: [Motor, MISInsurance] }]
                    })
                    return res.status(200).json({
                        data: leads,
                        status: true,
                        message: "leads Fetched"
                    })
                }
            }
            else {
                console.log("qwet234565432356u")

                const leads = await Leads.findAll({
                    where: {
                        posId: req.userId,
                        createdAt: {
                            [Op.gte]: startDate,
                            [Op.lte]: endDate
                        },
                    },
                    include: [
                        PolicyDocs, LeadType, Customer, Transaction,
                        { model: LeadInsurance, include: [Motor, MISInsurance] }
                    ],
                    order: [["id", "DESC"]]
                })
                return res.status(200).json({
                    data: leads,
                    status: true,
                    message: "leads Fetched"
                })
            }
        }


    } catch (e) {
        next(e)
    }
}

exports.createCustomer = async (req, res, next) => {
    try {
        const pos = await User.findOne({
            where: { id: req.userId, [Op.or]: [{ type: "Pos" }, { type: "employee" }, { type: "service-provider" }, { type: "mis" }, { type: "ops" }] },
        });
        dataNotFound(pos, 403, "Not Authorized");

        const customer = await Customer.findOne({ where: { phone: req.body.phone } })
        // if (customer) {
        //     await Leads.update({
        //         customerId: customer.id
        //     }, { where: { id: req.params.id } });

        //     const lead = await LeadInsurance.findOne({ where: { leadId: req.params.id } })

        //     if (lead.motorInsuranceId) {
        //         await Motor.update({
        //             customerId: customer.id
        //         }, { where: { id: lead.motorInsuranceId } })
        //     }

        //     else if (lead.misInsuranceId) {
        //         await MISInsurance.update({
        //             customerId: customer.id
        //         }, { where: { id: lead.misInsuranceId } })
        //     }
        //     const html = `hello ${customer.first_name} , your policy created Successfully`
        //     await sendEmail(customer.email, "Your Policy Data Updated", html)

        //     return res.status(201).json({
        //         message: "Customer created",
        //         data: customer,
        //         status: true,
        //     });
        // }
        const newCustomer = await Customer.create(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                city: req.body.city,
                state: req.body.state,
                email: req.body.email,
                pincode: req.body.pincode,
                dob: req.body.dob,
                address_line1: req.body.address_line1,
                address_line2: req.body.address_line2,
                address_line3: req.body.address_line3,
                pan_card: req.body.pan_card,
                aadhar_card: req.body.aadhar_card,
                gender: req.body.gender,
                marital_status: req.body.marital_status,
                occupation: req.body.occupation,
                nominee_name: req.body.nominee_name,
                nominee_relation: req.body.nominee_relation,
                nominee_age: req.body.nominee_age,
                appointee_name: req.body.appointee_name,
                appointee_relation: req.body.appointee_relation,
                posId: req.userId,
            },
        );
        await Leads.update({
            customerId: newCustomer.id
        }, { where: { id: req.params.id } });

        const lead = await LeadInsurance.findOne({ where: { leadId: req.params.id } })

        if (lead.motorInsuranceId) {
            await Motor.update({
                customerId: newCustomer.id
            }, { where: { id: lead.motorInsuranceId } })
        }

        else if (lead.misInsuranceId) {
            await MISInsurance.update({
                customerId: newCustomer.id
            }, { where: { id: lead.misInsuranceId } })
        }
        const html = `hello ${newCustomer.first_name} , your policy created Successfully`
        await sendEmail(newCustomer.email, "Your Policy Data Updated", html)

        res.status(201).json({
            message: "Customer created",
            data: newCustomer,
            status: true,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.checkPolicy = async (req, res, next) => {
    try {
        const motor_vehicle_no_exist = await Motor.findOne({
            where: {
                vehicle_no: req.body.vehicle_no
            }
        })
        if (motor_vehicle_no_exist) {
            return res.status(400).json({
                message: "Policy with this vehicle number already exist in system",
                status: false
            })
        }

        const vehicle_no_exist = await MISInsurance.findOne({
            where: {
                vehicle_no: req.body.vehicle_no
            }
        })
        if (vehicle_no_exist) {
            return res.status(400).json({
                message: "Policy with this vehicle number already exist in system",
                status: false
            })
        }

        if (req.body.policy_no) {
            const policy_no_exist = await MISInsurance.findOne({
                where: {
                    policy_no: req.body.policy_no
                }
            })
            if (policy_no_exist) {
                return res.status(400).json({
                    message: "Policy with this policy number already exist in system",
                    status: false
                })
            }
        }
        
        return res.status(200).json({
            message: "Policy not Found",
            status: true
        })
    } catch (e) {
        next(e)
    }
}

exports.fillAssetDetail = async (req, res, next) => {
    try {
        const { file, body } = await UploadFile(req, "/asset");

        const user = await User.findOne({
            where: { id: req.userId, [Op.or]: [{ type: "Pos" }, { type: "employee" }, { type: "ops" }, { type: "service-provider" }, { type: "mis" }] },
        });
        dataNotFound(user, 403, "Not Authorized");



        if (req.body.leadType == 1) {
            const vehicle_no_exist = await Motor.findOne({
                where: {
                    vehicle_no: req.body.vehicle_no
                }
            })
            if (vehicle_no_exist) {
                return res.status(400).json({
                    message: "Policy with this vehicle number already exist in system",
                    status: true
                })
            }

            if (req.body.policy_no) {
                const policy_no_exist = await Motor.findOne({
                    where: {
                        policy_no: req.body.policy_no
                    }
                })
                if (policy_no_exist) {
                    return res.status(400).json({
                        message: "Policy with this vehicle number already exist in system",
                        status: true
                    })
                }
            }
            const newMotor = await Motor.create({
                vehicle_type: body.vehicle_type,
                case_type: req.body.case_type,
                policy_type: req.body.policy_type,
                vehicle_no: body.vehicle_no,
                vehicle_make: body.vehicle_make,
                vehicle_model: body.vehicle_model,
                fuel_type: body.fuel_type,
                vehicle_variant: body.vehicle_variant,
                vehicle_mfg_yr: body.vehicle_mfg_yr,
                registration_date: req.body.registration_date,
                rto: req.body.rto,
                rm_name_Code: body.rm_name_Code,
                gaskit_installed: body.gaskit_installed,
                gaskit_status: body.gaskit_status,
                gaskit_outside: body.gaskit_outside,
                policy_status: body.policy_status,
                required_add_on: body.required_add_on,
                required_insurance_company: req.body.required_insurance_company,
                require_idv: req.body.require_idv,
                require_discount: req.body.require_discount,
                expected_final_premium: req.body.expected_final_premium,
                previous_policy_add_on: req.body.previous_policy_add_on,
                previous_policy_insurance_company: req.body.previous_policy_insurance_company,
                previous_policy_idv: req.body.previous_policy_idv,
                previous_policy_discount: req.body.previous_policy_discount,
                remarks: req.body.remark,
                reason: req.body.reason,
                policy_status: req.body.policy_status,
                od_net_premium: req.body.od_net_premium,
                tp_cover: req.body.tp_cover,
                addons: req.body.addons,
                cc_gcv_str: req.body.cc_gcv_str,
                insurance_branch: req.body.insurance_branch,
                broker_name: req.body.broker_name,
                remark_internal_ops: req.body.remark_internal_ops,
                file: req.body.file,
                file_type: req.body.file_type,
            });

            const lead = await Leads.create({
                leadtypeId: req.body.leadType,
                posId: req.userId,
                type: req.body.type
            });


            const arr = []
            for (let i = 0; i < file.length; i++) {
                const obj = {
                    document_type: file[i].fieldname,
                    image: file[i].path,
                    leadId: lead.id
                }
                arr.push(obj)
            }

            await PolicyDocs.bulkCreate(arr)
            await LeadInsurance.create({
                motorInsuranceId: newMotor.id,
                leadId: lead.id
            });
            const admin = await User.findOne({ where: { type: "admin" } })

            await send_notification(admin.fcm_token, "Flask IT Solutions", "New Policy Created")


            await Notification.create({
                leadId: lead.id,
                adminId: admin.id,
                message: "New Policy Added"
            })
            const ops = await User.findAll({ where: { type: "ops" } })

            for (var i = 0; i < ops.length; i++) {
                await Notification.create({
                    leadId: lead.id,
                    opsId: ops[i].id,
                    message: "New Policy Added"
                })

                await send_notification(ops[i].fcm_token, "Flask IT Solutions", "New Policy Created")
            }
            return res.status(201).json({
                message: "Detail Inserted",
                data: lead,
                status: true,
            });

        }
        else if (req.body.leadType == 2) {

            const vehicle_no_exist = await MISInsurance.findOne({
                where: {
                    vehicle_no: req.body.vehicle_no
                }
            })
            if (vehicle_no_exist) {
                return res.status(400).json({
                    message: "Policy with this vehicle number already exist in system",
                    status: true
                })
            }

            if (req.body.policy_no) {
                const policy_no_exist = await MISInsurance.findOne({
                    where: {
                        policy_no: req.body.policy_no
                    }
                })
                if (policy_no_exist) {
                    return res.status(400).json({
                        message: "Policy with this vehicle number already exist in system",
                        status: true
                    })
                }
            }

            const customer = await Customer.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                city: req.body.city,
                address_line1: req.body.address_line1,
                address_line2: req.body.address_line2,
                address_line3: req.body.address_line3,
                state: req.body.state,
                email: req.body.email,
                pincode: req.body.pincode,
                posId: req.userId
            })

            const newMIS = await MisInsurance.create({
                policy_no: body.policy_no,
                case_type: req.body.case_type,
                policy_type: req.body.policy_type,
                vehicle_type: body.vehicle_type,
                vehicle_no: body.vehicle_no,
                policy_status: req.body.policy_status,
                insurance_company: body.insurance_company,
                payment_mode: req.body.payment_mode,
                rto: req.body.rto,
                customerId: customer.id,
                od_net_premium: req.body.od_net_premium,
                tp_cover: req.body.tp_cover,
                addons: req.body.addons,
                discount: req.body.discount,
                cc_gcv_str: req.body.cc_gcv_str,
                insurance_branch: req.body.insurance_branch,
                broker_name: req.body.broker_name,
                remark_internal_ops: req.body.remark_internal_ops,
                remark_pos: req.body.remark_pos,
            });

            const lead = await Leads.create({
                leadtypeId: req.body.leadType,
                posId: req.userId,
                status: "pending",
                customerId: customer.id,
                type: req.body.type,
            });
            const arr = [];
            for (let i = 0; i < file.length; i++) {
                const obj = {
                    document_type: file[i].fieldname,
                    image: file[i].path,
                    leadId: lead.id
                }
                arr.push(obj)
            }
            await PolicyDocs.bulkCreate(arr)
            await LeadInsurance.create({
                misInsuranceId: newMIS.id,
                leadId: lead.id
            });

            const admin = await User.findOne({ where: { type: "admin" } })

            await send_notification(admin.fcm_token, "Flask IT Solutions", "New Mis Created")

            await Notification.create({
                leadId: lead.id,
                adminId: admin.id,
                message: "New MIS Added"
            })
            const ops = await User.findAll({ where: { type: "ops" } })

            for (var i = 0; i < ops.length; i++) {
                await Notification.create({
                    leadId: lead.id,
                    opsId: ops[i].id,
                    message: "New MIS Added"
                })

                await send_notification(ops[i].fcm_token, "Flask IT Solutions", "New MIS Created")
            }

            return res.status(201).json({
                message: "Mis Inserted Lead",
                status: true,
            });
        }


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getLeadType = async (req, res, next) => {
    try {
        const type = await LeadType.findAll();

        res.status(200).json({
            message: "lead type fetched",
            data: type,
            status: true,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getfilevalueleads = async (req, res, next) => {
    var date = new Date();
    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = date;
    let where = {};

    try {
        const { startDate, endDate, vehicle_no, insurance_company, policy_type, vehicle_type } = req.query;

        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate).setHours(23, 59, 59, 999);
        }
        where.createdAt = {
            [Op.between]: [start, end],
        };
        if (vehicle_no) {
            where.vehicle_no = { [Op.like]: `%${vehicle_no}%` };
        }
        if (insurance_company) {
            where.required_insurance_company = insurance_company;
        }
        if (policy_type) {
            where.policy_type = policy_type
        }
        if (vehicle_type) {
            where.vehicle_type = vehicle_type
        }
        const Pos = await User.findOne({
            where: { id: req.userId, [Op.or]: [{ type: "Pos" }, { type: "employee" }, { type: "ops" }, { type: "mis" }] },
        });
        dataNotFound(Pos, 403, "Not Authorized");

        const customer = await Customer.findAll({
            where: { posId: req.userId },
            include: [
                {
                    model: Leads,
                    include: [LeadType, PolicyDocs, Quotation, Transaction]
                },
                {
                    model: Motor,
                    where: where,
                },
            ],
        });
        dataNotFound(customer, 404, "lead not found");

        res.status(200).json({
            message: "Leads fetched",
            data: customer,
            status: true,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getMisfilevalueleads = async (req, res, next) => {
    var date = new Date();
    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = date;
    let where = { posId: req.userId };

    try {
        const { startDate, endDate, policy_type, vehicle_type } = req.query;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate).setHours(23, 59, 59, 999);
        }
        where.createdAt = {
            [Op.between]: [start, end],
        };
        if (vehicle_no) {
            where.vehicle_no = { [Op.like]: `%${vehicle_no}%` };
        }
        if (insurance_company) {
            where.required_insurance_company = insurance_company;
        }
        if (policy_type) {
            where.policy_type = policy_type
        }
        if (vehicle_type) {
            where.vehicle_type = vehicle_type
        }
        const Pos = await User.findOne({
            where: { id: req.userId, [Op.or]: [{ type: "Pos" }, { type: "employee" }, { type: "mis" }, { type: "ops" }] },
        });
        dataNotFound(Pos, 403, "Not Authorized");

        const customer = await Customer.findAll({
            where: where,
            include: [{ model: Leads, include: [LeadType, PolicyDocs] },
            {
                model: MISInsurance,
                where: where,
            }
            ],
        });
        dataNotFound(customer, 404, "lead not found");

        res.status(200).json({
            message: "Leads fetched",
            data: customer,
            status: true,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.accept_rejectQuotation = async (req, res, next) => {
    try {
        const Pos = await User.findOne({
            where: { id: req.userId, [Op.or]: [{ type: "Pos" }, { type: "employee" }, { type: "service-provider" }, { type: "mis" }, { type: "ops" }] },
        });
        dataNotFound(Pos, 403, "Not Authorized");

        const leads = await Leads.findOne({
            where: { id: req.params.id },
            include: { model: Customer, include: [Motor] },
        });
        dataNotFound(leads, 404, "lead not found");

        if (req.body.accept == false) {
            await leads.update({
                remark: req.body.remark,
                quotation_generated: false,
            })
            const html = `hello ${Pos.name} , You Rejected the quotation`
            await sendEmail(Pos.email, "Quotation Rejected", html)
            const quotation = await Quotation.findAll({ where: { motorInsuranceId: leads.customer.motorInsurance.id } })
            for (var i = 0; i < quotation.length; i++) {
                await Quotation.update({
                    isRejected: true
                }, { where: { id: quotation[i].id } })
            }

            const admin = await User.findOne({ where: { type: "admin" } })

            await send_notification(admin.fcm_token, "Flask IT Solutions", "Quotation Rejected")

            await Notification.create({
                leadId: leads.id,
                adminId: admin.id,
                message: "Quotation Rejected"
            })

            const ops = await User.findOne({ where: { id: leads.operantionalId } })

            await Notification.create({
                leadId: leads.id,
                opsId: ops.id,
                message: "Quotation Rejected"
            })

            await send_notification(ops.fcm_token, "Flask IT Solutions", "Quotation Rejected")
        }
        else if (req.body.accept == true) {
            const quotation = await Quotation.findAll({ where: { motorInsuranceId: leads.customer.motorInsurance.id, id: { [Op.ne]: req.body.accepted_quotation } } })
            for (var i = 0; i < quotation.length; i++) {
                await Quotation.update({
                    isRejected: true
                }, { where: { id: quotation[i].id } })
            }
            await leads.update({
                remark: null,
                accepted_quotation: req.body.accepted_quotation,
            })
            const insurance_company = await Quotation.findOne({ where: { id: req.body.accepted_quotation } })
             
            await Motor.update({
                insurance_company: insurance_company.quotation
            }, { where: { id: leads.customer.motorInsurance.id } });
            
            const html = `hello ${Pos.name} , You Successfully Accept the quotation`
            await sendEmail(Pos.email, "Quotation Accepted", html)

            const admin = await User.findOne({ where: { type: "admin" } })

            await send_notification(admin.fcm_token, "Flask IT Solutions", "Quotation Accepted")

            await Notification.create({
                leadId: lead.id,
                adminId: admin.id,
                message: "Quotation Accepted"
            })

            const ops = await User.findOne({ where: { id: leads.operantionalId } })

            await Notification.create({
                leadId: leads.id,
                opsId: ops.id,
                message: "Quotation Accepted"
            })

            await send_notification(ops.fcm_token, "Flask IT Solutions", "Quotation Accepted")
        }

        res.status(200).json({
            message: `Lead Updated`,
            data: leads,
            status: true,
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getLeadDetails = async (req, res, next) => {
    try {
        const leads = await Leads.findOne({
            where: { id: req.params.id },
            include: [
                LeadType, PolicyDocs, Transaction, Quotation,
                {model  : LeadInsurance , include : [{model: Motor, include: Quotation }, MISInsurance]},
                { model: User, as: "ops" },
                { model: User, as: "pos" },
                { model: Customer},
            ],
        });

        res.status(200).json({
            message: "Lead details fetched",
            data: leads,
            status: true,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.misUpdateLead = async (req, res, next) => {
    try {
        const { file, body } = await UploadFile(req, "/asset");

        const mis = await User.findOne({ where: { id: req.userId, type: "mis" } });
        dataNotFound(mis, 409, "Unauthorized User");

        const lead = await Leads.findOne({ where: { id: req.params.id } });
        dataNotFound(lead, 404, "Lead Not Found");

        const customer = await Customer.findOne({ where: { id: lead.customerId } });
        dataNotFound(customer, 404, "Customer Not Found");

        const misInsurance = await MisInsurance.findOne({ where: { customerId: lead.customerId } });
        dataNotFound(mis, 404, "MIS Not Found");

        customer.update({
            name: body.name,
            email: body.email,
            phone: body.phone,
            dob: body.dob,
            address: body.address,
            city: body.city,
            state: body.state,
        });

        misInsurance.update({
            vehicle_no: body.vehicle_no,
            vehicle_mfg_yr: body.vehicle_mfg_yr,
            fuel_type: body.fuel_type,
            vehicle_type: body.vehicle_type,
            vehicle_make: body.vehicle_make,
            vehicle_model: body.vehicle_model,
            vehicle_variant: body.vehicle_variant,
            rm_name_Code: body.rm_name_Code,
            pos_name_Code: body.pos_name_Code,
            policy_status: body.policy_status,
        });

        res.status(200).json({
            message: "Mis Policy Updated",
            data: misInsurance,
            status: true,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAddons = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "addons Fetched",
            data: await Addons.findAll(),
            status: true
        })
    } catch (e) {
        next(e)
    }
}

exports.getPincodeData = async (req, res, next) => {
    const state = req.query.pincode
    try {

        const pincode = await Pincode.findOne({ where: { Pin_Code: state } })
        if (!pincode) {
            return res.status(404).json({
                message: "Invalid Pincode",
                status: false
            })
        }
        res.status(200).json({
            message: "Pincode Data Fetched Successfully",
            data: pincode,
            status: true
        })
    } catch (err) {
        if (!err.statuscode) {
            err.statuscode = 500
        }
        next(err)
    }
}

exports.getCompany = async (req, res, next) => {
    try {
        const company = await PreviousInsurer.findAll({ attributes: ["name"] })
        res.status(200).json({
            message: "Company Fetched",
            data: company,
            status: true
        })
    } catch (e) {
        next(e)
    }
}
exports.getRto = async (req, res, next) => {
    try {
        const rto = await RTO.findAll({ attributes: ["RTO_Code", "registered_city_name"] })
        res.status(200).json({
            message: "RTO Data Fetched",
            data: rto,
            status: true
        })
    } catch (e) {
        next(e)
    }
}
exports.updateImage = async (req, res, next) => {
    try {
        const { file, body } = await UploadFile(req, "/asset");
        const id = JSON.parse(body.id)
        if (id.length == 1) {
            const doc = await PolicyDocs.findOne({ where: { id: id[0] } })
            if (doc.document_type == file[0].fieldname) {
                await removeFile(doc.image)
                await doc.update({
                    image: file[0].path
                })
            }
        }
        else {
            for (var i = 0; i < id.length; i++) {
                const doc = await PolicyDocs.findOne({ where: { id: id[i] } })
                await removeFile(doc.image)
                for (var j = 0; j < file.length; j++) {
                    if (doc.document_type == file[j].fieldname) {
                        await doc.update({
                            image: file[j].path
                        })
                    }
                }
            }
        }
        res.status(200).json({
            message: "Image Updated",
            status: true
        })
    } catch (e) {
        next(e)
    }
}

exports.getNominee = async (req, res, next) => {
    try {
        const nominee = await Nominee.findAll();
        res.status(200).json({
            message: "Nominee Data Fetched",
            data: nominee,
            status: true
        })

    } catch (e) {
        next(e)
    }
}

exports.getfilteredLeads = async (req, res, next) => {
    try {
        const { start, end } = req.query
        const motor = await Motor.findAll({
            where: {
                [Op.or]: [
                    { vehicle_no: req.query.vehicle_no ? req.query.vehicle_no : "" },
                    { policy_type: req.query.policy_type ? req.query.policy_type : "" },
                    { vehicle_type: req.query.vehicle_type ? req.query.vehicle_type : "" },
                    {
                        createdAt: {
                            [Op.gt]: start,
                            [Op.lt]: new Date(end).setHours(23, 59, 59, 999)
                        }
                    }
                ]
            }
            , include: { model: Customer, include: { model: Leads, include: [LeadType, Quotation, Transaction] } }
        })
        const mis = await MISInsurance.findAll({
            where: {
                [Op.or]: [
                    { vehicle_no: req.query.vehicle_no ? req.query.vehicle_no : "" },
                    { policy_type: req.query.policy_type ? req.query.policy_type : "" },
                    { vehicle_type: req.query.vehicle_type ? req.query.vehicle_type : "" },
                    {
                        createdAt: {
                            [Op.gt]: start,
                            [Op.lt]: new Date(end).setHours(23, 59, 59, 999)
                        }
                    }
                ]
            }, include: { model: Customer, include: { model: Leads, include: [LeadType, Quotation, Transaction] } }
        })

        const arr = [...motor, ...mis]

        res.status(200).json({
            message: "Leads fetched",
            data: arr,
            status: true
        })

    } catch (e) {
        next(e)
    }
};

exports.getMyDetails = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.userId }, include: [ExamAtempts, Document, Bank, { model: Pos, as: "addedPos" }] });
        res.status(200).json({
            message: "Details Fetched",
            data: user,
            status: true
        })
    } catch (e) {
        next(e)
    }
}

exports.sendPaymentScreenShot = async (req, res, next) => {
    try {
        const { file, body } = await UploadFile(req, "/transaction");
        const lead = await Leads.findOne({ where: { id: req.params.id } })
        const transaction = await Transaction.create({
            userId: lead.posId,
            leadId: lead.id,
            transaction_proof: file ? file[0].path : file.path,
            transactionId: `TRANSC-${Date.now()}`
        })

        const admin = await User.findOne({ where: { type: "admin" } })

        await send_notification(admin.fcm_token, "Flask IT Solutions", "Payment Sent By pos!")

        await Notification.create({
            leadId: lead.id,
            adminId: admin.id,
            message: "Payment Sent By pos"
        })

        const ops = await User.findOne({ where: { id: lead.operantionalId } })

        await Notification.create({
            leadId: lead.id,
            opsId: ops.id,
            message: "Payment Sent By pos"
        })

        await send_notification(ops.fcm_token, "Flask IT Solutions", "Payment Sent By pos")

        res.status(200).json({
            message: "Transaction Completed",
            data: lead,
            status: true
        })
    } catch (e) { next(e) }
}

exports.addImages = async (req, res, next) => {
    try {
        const { file, body } = await UploadFile(req, "/asset");
        const arr = []
        for (let i = 0; i < file.length; i++) {
            const obj = {
                document_type: file[i].fieldname,
                image: file[i].path,
                leadId: req.params.id
            }
            arr.push(obj)
        }

        await PolicyDocs.bulkCreate(arr)

        res.status(200).json({
            message: "Policy document_uploaded",
            data: arr,
            status: true
        })
    } catch (e) { next(e) }
}