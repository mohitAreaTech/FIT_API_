const { Customer, User, Document, EndoresmentUser, User_module, Module, Claim, ClaimType, LeadType, Leads, Exam, ExamAtempts, ExamResult, Question, Pos, Ops, Bank, Issue, Ticket, Endoresment, EndoresmentReason, SpotSurveyor, Driver, Intimator, User_Question, AccidentDetail, AssesmentDetail, Motor, LeadInsurance, MISInsurance, Quotation, PolicyDocs, Zone, District, State, Transaction, SP,Employee, Notification, Head, Addons, MMVMaster, Nominee, Pincode, PreviousInsurer, RTO,
    StateMaster, Permission, NationalHead, StateHead, ZonalHead, BranchHead, DistrictHead ,User_Permission,Branch, Oditlogs} = require('../model');

exports.relation = () => {
    
    MMVMaster.hasOne(Motor, { foreignKey: "vehicleId" });
  Motor.belongsTo(MMVMaster, { foreignKey: "vehicleId" });

    Customer.hasOne(Motor)
    Motor.belongsTo(Customer)

    Customer.hasOne(Leads)
    Leads.belongsTo(Customer)

    Motor.hasOne(LeadInsurance);
    LeadInsurance.belongsTo(Motor)

    Leads.hasOne(LeadInsurance)
    LeadInsurance.belongsTo(Leads)

    Customer.hasOne(MISInsurance)
    MISInsurance.belongsTo(Customer)

    MISInsurance.hasOne(LeadInsurance);
    LeadInsurance.belongsTo(MISInsurance)

    Quotation.hasOne(Leads, { foreignKey: "accepted_quotation" });
    Leads.belongsTo(Quotation, { foreignKey: "accepted_quotation" });

    Motor.hasMany(Quotation);
    Quotation.belongsTo(Motor);

    Leads.hasMany(PolicyDocs);
    PolicyDocs.belongsTo(Leads)

    User.hasMany(Leads, { foreignKey: "operantionalId", as: "opsLead" })
    Leads.belongsTo(User, { foreignKey: "operantionalId", as: "ops" })

    LeadType.hasMany(Leads, { foreignKey: "leadtypeId" })
    Leads.belongsTo(LeadType, { foreignKey: "leadtypeId" })

    User.hasMany(Leads, { foreignKey: "posId", as: "pos" })
    Leads.belongsTo(User, { foreignKey: "posId", as: "pos" });

    User.hasOne(Pos, { foreignKey: "posId", as: "addedPos" });
    Pos.belongsTo(User, { foreignKey: "posId", as: "addedPos" });

    // User.hasOne(SP, { foreignKey: "spId" , as : "service_providers" });
    // SP.belongsTo(User, { foreignKey: "spId" , as : "service_providers" });
    
    // User.hasOne(SP, { foreignKey: "RMID" , as : "RM_ID" });
    // SP.belongsTo(User, { foreignKey: "RMID" , as : "RM_ID" });

    User.hasMany(Pos, { foreignKey: "employeeId", as: "employee" });
    Pos.belongsTo(User, { foreignKey: "employeeId", as: "employee" });

    // User.hasMany(SP, { foreignKey: "posId", as: "sp_pos" });
    // SP.belongsTo(User, { foreignKey: "posId", as: "sp_pos" });


    // User.hasMany(Ops, { foreignKey: "userId" });
    // Ops.belongsTo(User, { foreignKey: "userId" });

    User.hasMany(Customer, { foreignKey: "posId" });
    Customer.belongsTo(User, { foreignKey: "posId" });

    Document.belongsTo(User);
    User.hasMany(Document);

    // Exam.hasMany(Question, { foreignKey: "examId" });
    // Question.belongsTo(Exam, { foreignKey: "examId" })

    // Question.hasMany(ExamResult, { foreignKey: "questionId" })
    // ExamResult.belongsTo(Question, { foreignKey: "questionId" });

    // User.hasMany(ExamResult, { foreignKey: "traineeId", as: "trainee" })
    // ExamResult.belongsTo(User, { foreignKey: "traineeId", as: "trainee" })

    User.hasMany(ExamAtempts, { foreignKey: "traineeId" })
    ExamAtempts.belongsTo(User, { foreignKey: "traineeId" })

    // Exam.hasMany(ExamAtempts, { foreignKey: "examId" })
    // ExamAtempts.belongsTo(Exam, { foreignKey: "examId" })

    // ExamAtempts.hasMany(ExamResult, { foreignKey: "attemptId" });
    // ExamResult.belongsTo(ExamAtempts, { foreignKey: "attemptId" })

    // User.hasMany(User_module, { foreignKey: "traineeId" })
    // User_module.belongsTo(User, { foreignKey: "traineeId" })

    // User_module.belongsTo(Module, { foreignKey: "moduleId" })
    // Module.hasMany(User_module, { foreignKey: "moduleId" })

    User.hasOne(Bank, { foreignKey: "userId" });
    Bank.belongsTo(User, { foreignKey: "userId" });


    // Customer.hasMany(Claim, { foreignKey: "customerId" });
    // Claim.belongsTo(Customer, { foreignKey: "customerId" });

    // User.hasMany(Claim, { foreignKey: "createdBy", as: "creator" });
    // Claim.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

    // Issue.hasMany(Ticket, { foreignKey: "issueId" });
    // Ticket.belongsTo(Issue, { foreignKey: "issueId" });

    // User.hasMany(Ticket, { foreignKey: "userId" });
    // Ticket.belongsTo(User, { foreignKey: "userId" });

    // Customer.hasMany(Endoresment, { foreignKey: "customerId" });
    // Endoresment.belongsTo(Customer, { foreignKey: "customerId" });

    // EndoresmentUser.hasMany(Endoresment, { foreignKey: "endoresmentId" });
    // Endoresment.belongsTo(EndoresmentUser, { foreignKey: "endoresmentId" });

    // EndoresmentReason.hasMany(Endoresment, { foreignKey: "endoresmentReasonId" });
    // Endoresment.belongsTo(EndoresmentReason, { foreignKey: "endoresmentReasonId" });

    // User.hasMany(EndoresmentUser);
    // EndoresmentUser.belongsTo(User);

    // SpotSurveyor.hasMany(Claim, { foreignKey: "spotSurveyorId" });
    // Claim.belongsTo(SpotSurveyor, { foreignKey: "spotSurveyorId" });

    // Driver.hasMany(Claim, { foreignKey: "driverId" });
    // Claim.belongsTo(Driver, { foreignKey: "driverId" });

    // Intimator.hasMany(Claim, { foreignKey: "intimatorId" });
    // Claim.belongsTo(Intimator, { foreignKey: "intimatorId" });

    // AccidentDetail.hasMany(Claim, { foreignKey: "accidentDetailId" });
    // Claim.belongsTo(AccidentDetail, { foreignKey: "accidentDetailId" });

    // AssesmentDetail.hasMany(Claim, { foreignKey: "assesmentDetailId" });
    // Claim.belongsTo(AssesmentDetail, { foreignKey: "assesmentDetailId" });

    // User.hasMany(Claim, { foreignKey: "customerId" });
    // Claim.belongsTo(User, { foreignKey: "customerId" });

    Zone.hasMany(State);
    State.belongsTo(Zone);

    // State.hasMany(District);
    // District.belongsTo(State);

    // Zone.hasMany(District);
    // District.belongsTo(Zone)

    Zone.hasMany(Pos);
    Pos.belongsTo(Zone)

    State.hasMany(Pos);
    Pos.belongsTo(State)

    // District.hasMany(Pos);
    // Pos.belongsTo(District);

    // Zone.hasMany(SP);
    // SP.belongsTo(Zone)

    // State.hasMany(SP);
    // SP.belongsTo(State)

    // District.hasMany(SP);
    // SP.belongsTo(District);
    
    // Zone.hasMany(Branch);
    // Branch.belongsTo(Zone)

    // State.hasMany(Branch);
    // Branch.belongsTo(State)

    // District.hasMany(Branch);
    // Branch.belongsTo(District);

    // User.hasMany(User_Question);
    // User_Question.belongsTo(User);

    // Question.hasMany(User_Question);
    // User_Question.belongsTo(Question);

    // User.hasMany(Transaction);
    // Transaction.belongsTo(User);

    // Leads.hasMany(Transaction);
    // Transaction.belongsTo(Leads)

    // User.hasMany(Notification, { foreignKey: "adminId", as: "adminNotification" });
    // Notification.belongsTo(User, { foreignKey: "adminId", as: "adminNotification" });

    // User.hasMany(Notification, { foreignKey: "posId", as: "PosNotification" });
    // Notification.belongsTo(User, { foreignKey: "posId", as: "PosNotification" });

    // User.hasMany(Notification, { foreignKey: "opsId", as: "OpsNotification" });
    // Notification.belongsTo(User, { foreignKey: "opsId", as: "OpsNotification" });

    // Leads.hasMany(Notification);
    // Notification.belongsTo(Leads);

    // User.hasMany(User_Permission);
    // User_Permission.belongsTo(User)

    // Permission.hasMany(User_Permission);
    // User_Permission.belongsTo(Permission);

    // User.hasOne(NationalHead, { foreignKey: "nationalHeadId", as: "nationalHead" });
    // NationalHead.belongsTo(User, { foreignKey: "nationalHeadId", as: "nationalHead" })

    // User.hasMany(NationalHead, { foreignKey: "zonalHeadId", as: "zonal_head" });
    // NationalHead.belongsTo(User, { foreignKey: "zonalHeadId", as: "zonal_head" })

    // Zone.hasMany(NationalHead);
    // NationalHead.belongsTo(Zone)

    // User.hasOne(ZonalHead, { foreignKey: "zonalHeadId", as: "ZonalHead" });
    // ZonalHead.belongsTo(User, { foreignKey: "zonalHeadId", as: "ZonalHead" })

    // User.hasMany(ZonalHead, { foreignKey: "stateHeadId", as: "state_head" });
    // ZonalHead.belongsTo(User, { foreignKey: "stateHeadId", as: "state_head" })

    // State.hasMany(ZonalHead);
    // ZonalHead.belongsTo(State)

    // User.hasOne(StateHead, { foreignKey: "stateHeadId", as: "StateHead" });
    // StateHead.belongsTo(User, { foreignKey: "stateHeadId", as: "StateHead" })

    // User.hasMany(StateHead, { foreignKey: "districtHeadId", as: "district_head" });
    // StateHead.belongsTo(User, { foreignKey: "districtHeadId", as: "district_head" })

    // District.hasMany(StateHead);
    // StateHead.belongsTo(District)

    // User.hasOne(DistrictHead, { foreignKey: "districtHeadId", as: "districtHead" });
    // DistrictHead.belongsTo(User, { foreignKey: "districtHeadId", as: "districtHead" })
    
    // Branch.hasMany(DistrictHead);
    // DistrictHead.belongsTo(Branch)

    // User.hasMany(DistrictHead, { foreignKey: "branchHeadId", as: "branchHead" });
    // DistrictHead.belongsTo(User, { foreignKey: "branchHeadId", as: "branchHead" })

    // User.hasMany(BranchHead, { foreignKey: "branchHeadId", as: "Branch_Head" });
    // BranchHead.belongsTo(User, { foreignKey: "branchHeadId", as: "Branch_Head" })

    // User.hasMany(BranchHead, { foreignKey: "employeeId", as: "Employee_Id" });
    // BranchHead.belongsTo(User, { foreignKey: "employeeId", as: "Employee_Id" })

    // Zone.hasOne(Head);
    // Head.belongsTo(Zone)

    // State.hasOne(Head);
    // Head.belongsTo(State)

    // District.hasOne(Head);
    // Head.belongsTo(District);
    
    // Branch.hasOne(Head);
    // Head.belongsTo(Branch);

    // User.hasOne(Head);
    // Head.belongsTo(User);
    
    // Zone.hasOne(Employee);
    // Employee.belongsTo(Zone)

    // State.hasOne(Employee);
    // Employee.belongsTo(State)

    // District.hasOne(Employee);
    // Employee.belongsTo(District);
    
    // Branch.hasOne(Employee);
    // Employee.belongsTo(Branch);
    
    // Branch.hasOne(Pos);
    // Pos.belongsTo(Branch);

    // User.hasOne(Employee);
    // Employee.belongsTo(User);

    // User.hasMany(Oditlogs);
    // Oditlogs.belongsTo(User);

}