// const Department = require("../model/Department");
const Employee = require("../model/Employe");
const ReportingManager = require("../model/ReportingManager");
const Designation = require("../model/designation");
const Roles = require("../model/roles");
const bcrypt = require('bcrypt');
const sequelize = require("../utils/database");
const { Department } = require("../model");
const { Sequelize } = require("sequelize");
const LeadsManagementForSubmitOffline = require("../model/LeadsManagement");
const { sendEmail, send_notification } = require("../helper/certificate");


//******************* */ designation section starts here ****************/

// create designation 
exports.createDesignation = async (req, res, next) => {
    try {
        const designation = await Designation.findOne({
            where: {
                designation_name: req.body.designation,
            }
        });

        // if designation created is present in db then we don't need to create
        if (designation) {
            return res.status(500).json({
                success: false,
                message: 'Provided Designation Already Exists',
                data: designation
            })
        }

        // if designation is not present than create one
        const newDesignation = await Designation.create({
            designation_name: req.body.designation,
        });

        res.status(200).json({
            success: true,
            message: 'Designation Created Successfully!!',
            data: newDesignation
        });
        
    } catch (err) {
        console.log('Error in creating Designation', err);
        res.status(500).json({
            success: false,
            message: 'Error in creating Designation',
        })       
    }
}

// edit designation
exports.editDesignation = async (req, res, next) => {
    try {
        console.log('reqzdfjasldf', req.params.id)

        const existingDesignation = await Designation.findOne({
            where: {
                id: req.params.id
            }
        });

        console.log('existing Desgination', existingDesignation);

        const existingEmployee = await Employee.findAll({
            where: {
                designation: existingDesignation.designation_name
            }
        });

        const newDesignation = await existingDesignation.update({
            designation_name: req.body.designationName
        })

        console.log('exisitng EMployee', existingEmployee);

        for (let i = 0; i < existingEmployee.length; i++){
            existingEmployee[i].update({
                    designation: req.body.designationName
            })
        }

        res.status(200).json({
            success: true,
            message: 'Designation Edited Successfully!!',
            data: newDesignation
        })

    } catch (err) {
        console.log('Error in editing Designation', err);
        res.status(500).json({
            success: false,
        })
    }
}

// Get all Designation
exports.getAllDesignation = async (req, res, next) => {
    try {
        
        const allDesignation = await Designation.findAll();
        console.log('All Designation', allDesignation);

        res.status(200).json({
            success: true,
            data: allDesignation,
            message: 'All Designation Fetched!'
        })

    } catch (err) {
        console.log('Error in fetching Designation', err);
        res.status(500).json({
            success: false,
            message: 'Error in Getting all designation',
        })
    }
}

// delete all designation
exports.deleteDesignation = async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error in deleting Designation', err);
        res.status(500).json({
            success: false,
            message: 'Error in Deleting Designation'
        })
    }
}
//******************* */ designation section ends here ****************/

//******************* */ employee section starts here ****************/

// create Employee 
exports.createEmployee = async (req, res, next) => {
    try {
        
        const existingEmployee  = await Employee.findOne({
            where: { phone: req.body.phoneNumber, email: req.body.emailId }
        });

        if (existingEmployee) {
            return res.status(500).json({
                success: false,
                message: 'Employee Already Exists!!',
                data: existingEmployee
            })
        };

        const lastFilledEmployeeId = await sequelize.query(`
        SELECT userId
        FROM employee_tables
        ORDER BY userId DESC
        LIMIT 1
        `);
        console.log('lastfileed accound', lastFilledEmployeeId)
    let newEmployeeID = (parseInt(lastFilledEmployeeId[0][0].userId) + 1).toString();
     

        // generate password
        const generatePassword = (Math.ceil(Math.random() * 1000000000)).toString();
        let flaskPass = "FLASKIT@"+generatePassword
        const hashedPassword = await bcrypt.hash(flaskPass, 10);


        if (req.body.roleName === 'CEO / Principal Officer') {
            const newEmployee = await Employee.create({
                username: `FLSK${newEmployeeID}`, 
                name: req.body.name,
                email: req.body.emailId,
                password: hashedPassword,
                phone: req.body.phoneNumber,
                designation: req.body.designationName,
                department: req.body.departmentName,
                role: req.body.roleName,
                zoneid: req.body.zoneId,
                stateid: req.body.stateId,
                reportingManager: req.body.roleName,
                status: 'active'
            });
            let subject = `Welcome to Flask IT Solutions`;
            let html = `<p>Dear ${req.body.name}</p>
            <p>Thank you for Joining on Flask IT Solutions. We are excited to have you join us!</p>
            <p>Kindly login through below credentials</p>
            <p>login Id : ${req.body.emailId}</p>
            <p>Password : ${flaskPass}</p>
            <p>Best regards,<br>Flask IT Solutions</p>`
            sendEmail(newEmployee.email, subject, html);
            
            res.status(200).json({
                success: true,
                message: 'Employee Created as CEO SuccessFully!!',
                data: newEmployee,
            })
        } else {

            const newEmployee = await Employee.create({
                username: `FLSK${newEmployeeID}`,
                name: req.body.name,
                email: req.body.emailId,
                password: hashedPassword,
                phone: req.body.phoneNumber,
                designation: req.body.designationName,
                department: req.body.departmentName,
                role: req.body.roleName,
                zoneid: req.body.zoneId,
                stateid: req.body.stateId,
                reportingManager: req.body.reportingManager,
                status: 'active'
            });

            let subject = `Welcome to Flask IT Solutions`;
            let html = `<p>Dear ${req.body.name}</p>
            <p>Thank you for Joining on Flask IT Solutions. We are excited to have you join us!</p>
            <p>Kindly login through below credentials</p>
            <p>login Id : ${req.body.emailId}</p>
            <p>Password : ${flaskPass}</p>
            <p>Best regards,<br>Flask IT Solutions</p>`
            sendEmail(newEmployee.email, subject, html);
    
            res.status(200).json({
                success: true,
                message: 'Employee Created SuccessFully!!',
                data: newEmployee,
            })    
        }

    } catch (err) {
        console.log('Error in creating Employee', err);
        res.status(500).json({
            success: false,
            message: 'Error in creating Employee'
        });
    }
}

// edit employee
exports.updateEmployee = async (req, res, next) => {
    try {

        const existingEmployee = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!existingEmployee) {
            return res.status(500).json({
                success: false,
                message: 'USer does not exist!!'
            })
        };

        // update Employee 
        const updatedEmployee = await existingEmployee.update({
            name: req.body.name,
            email: req.body.emailId,
            phone: req.body.phoneNumber,
            designation: req.body.designationName,
            department: req.body.departmentName,
            role: req.body.roleName,
            zoneid: req.body.zoneId,
            stateid: req.body.stateId,
            reportingManager: req.body.reportingManager,
        });

        res.status(200).json({
            success: true,
            message: "Employee Updated Successfully!!",
            data: updatedEmployee
        });
        
    } catch (err) {
        console.log('Error in updating Employee', err);
        res.status(500).json({
            success: false,
            message: 'Error in updating Employee',
        })
     }
}

// delete employee
exports.deleteEmployee = async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error in Deleting Employee', err);
        res.status(500).json({
            success: false,
            message: 'Error in deleting Employee',
        })
     }
}

// get all employee
exports.getAllEmployees = async (req, res, next) => {
    try {
        
        const allEmployees = await Employee.findAll();

        res.status(200).json({
            success: true,
            message: 'All Employee List Fetched!',
            data: allEmployees,
        })

    } catch (err) {
        console.log('Error in Getting all Employees', err);
        res.status(500).json({
            success: false,
            message: 'Error in Getting Employee Data',
        })
    }
}

exports.EmployeeDetails = async (req, res, next) => {
    try {

        const employeeDetails = await Employee.findOne({
            where: { id: req.params.id }
        });

        if (!employeeDetails) {
            res.status(500).json({
                success: false,
                message: 'Employee Not Found with This Id'
            })
        };

        res.status(200).json({
            success: true,
            message: 'Fetched All Employee Data!!',
            data: employeeDetails
        });
        
    } catch (err) {
        console.log('Error in Getting Employee Details', err);
        res.status(500).json({
            success: false,
            message: 'Error in Getting Employee Details'
        })
    }
}

exports.activateDeativatEmployee = async (req, res, next) => {
    try {
        
        // existing employee
        const employee = await Employee.findOne({
            where: { id: req.params.id }
        });

        // activate employee
        if (req.body.status === 'active') {

            await employee.update({
                name: employee.name,
                email: employee.email,
                password: employee.password,
                phone: employee.phone,
                status: 'active'
            })

            res.status(200).json({
                success: true,
                message: 'Employee Activated Successfully!!',
                data: employee,
            })
        }

        // deactivate Employee
        else if (req.body.status === 'deactivate') {
            await employee.update({
                name: employee.name,
                email: employee.email,
                password: employee.password,
                phone: employee.phone,
                status: 'deactive'
            });

            res.status(200).json({
                success: true,
                message: 'Employee Deactivated Successfully!!',
                data: employee,
            })

        }

    } catch (err) {
        console.log('Error in Activate and Deactivate Employee', err);
        res.status(500).json({
            success: false,
            message: 'Error in Activate and Deactivate Employee',
        })
    }
}



//******************* */ roles section starts here ****************/
// create Role 
exports.createRole = async (req, res, next) => {
    try {

        console.log('rolename', req.body)

        const existingRoles = await Roles.findOne({
            where: {
                role_name: req.body.rolesName
            }
        });

        // if roles are allowed than we will throw error
        if (existingRoles) {
            return res.status(500).json({
                success: false,
                message: 'Role already Exists !!',
                data: existingRoles
            })
        };

        const newRole = await Roles.create({
            role_name: req.body.rolesName,
        });

        res.status(200).json({
            success: true,
            message: 'new Role Created Successfully!!',
            data: newRole
        });

    } catch (err) {
        console.log('error in creating Role', err);
        res.status(500).json({
            success: false,
            message: 'Error in Creating Role',
        })
    }
}

// edit Role 
exports.editRole = async (req, res, next) => {
    try {
        // const existingRole = await Roles.findOne({
        //     where: {
        //         id: req.params.id
        //     }
        // });

        // console.log('existingRole', existingRole);

        
    } catch (err) {
        console.log('Error in editing Role', err);
        res.status(500).json({
            success: false,
            message: 'Error in Editing Role',
        })
    }
};

// delete Role
exports.deleteRole = async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error in Deleting Role', err);
        res.status(500).json({
            success: false,
            message: 'Error in deleting Role',
        })
    }
}

// get all roles
exports.getAllRoles = async (req, res, next) => {
    try {
        
        const allRoles = await Roles.findAll();

        res.status(200).json({
            success: true,
            message: 'fetched all Roles!!',
            data: allRoles,
        });

    } catch (err) {
        console.log('Error in Getting Roles', err);
        res.status(500).json({
            success: false,
            message: 'Error in Getting All Roles'
        });
    }
}

//******************* */ roles section ends here ****************/



//******************** Department section starts here ****************/
exports.createDepartment = async (req, res, next) => {
    try {

        const existingDepartment = await Department.findOne({
            where: {
                department_name: req.body.departmentName
            }
        });

        if (existingDepartment) {
            return res.status(500).json({
                success: false,
                message: 'Department Already Exists!!',
                data: existingDepartment
            })
        };

        const newDepartment = await Department.create({
            department_name: req.body.departmentName,
        });

        res.status(200).json({
            success: true,
            message: 'department Created Successfully!!',
            data: newDepartment,
        })
        
    } catch (err) {
        console.log('Error in creating Department', err);
        res.status(500).json({
            success: false,
            message: 'Error in Creating Department',
        })
    }
}

exports.editDepartment = async (req, res, next) => {
    try {
        
        const existingDepartment = await Department.findOne({
            where: {
                id: req.params.id
            }
        });
        console.log('department', existingDepartment);

        const exisitngEmployee = await Employee.findAll({
            where: {
                department: existingDepartment.department_name
            }
        });


        for (let i = 0; i < exisitngEmployee.length; i++) {
            exisitngEmployee[i].update({
                department: req.body.departmentName
            })
        }

        const newDepartment = await existingDepartment.update({
            department_name: req.body.departmentName
        });

        res.status(201).json({
            success: true,
            message: 'Department Edited Successfully!!',
            data: newDepartment
        });

    } catch (err) {
        console.log('Error in Editing Department', err);
        res.status(500).json({
            success: false,
            message: 'Error in Editing Department',
        })
    }
}

exports.deleteDepartment = async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error in deleting Department', err);
        res.status(500).json({
            success: false,
            message: 'Error in Deleting Department!!',
        });
    }
}

exports.getAllDepartment = async (req, res, next) => {
    try {

        const allDepartment = await Department.findAll();

        res.status(200).json({
            success: true,
            message: 'All Departments Fetched Successfully!!',
            data: allDepartment,
        })
        
    } catch (err) { 
        console.log('Error in Getting Department', err);
        res.status(500).json({
            success: false,
            message: 'Error in Fetching Department Details'
        });
    }
}

//******************* */ Department section ends here ****************/ 


//******************* */ Reporting Manager section starts here ****************/ 
exports.createReportingManger = async (req, res, next) => {
    try {

        const existingRm = await ReportingManager.findOne({
            where: { rm_name: req.body.rmName }
        });

        if (existingRm) {
           return res.status(500).json({
                success: false,
                message: "RM Already Exists!!!",
                data: existingRm
            })
        };

        const newRM = await ReportingManager.create({
            rm_name: req.body.rmName
        });

        res.status(200).json({
            success: true,
            message: 'Rm Created Successfully !!!',
            data: newRM,
        })
        
    } catch (err) {
        console.log('Error in creating RM', err);
        res.status(500).json({
            success: false,
            message: "Error in Creating RM",
        })
    }
}

exports.getAllRM = async (req, res, next) => {
    try {

        console.log('Request body', req.body);

        // national head
        if (req.body.designationName === 'National Head') {
            const allRm = await Employee.findAll({
                where: { designation: 'CEO / Principal Officer' }
            });

            if (!allRm) {
                return res.status(500).json({
                    success: false,
                    message: 'First You need to Create CEO/ Principal Officer for National Head'
                })
            }


            res.status(200).json({
                success: true,
                message: 'Reporting Managers for National Head Fetched!!!!',
                data: allRm,
            });
        }
        
        // zonal head
        else if (req.body.designationName === 'Zonal Head') {
            const allRm = await Employee.findAll({
                where: { designation: 'National Head' }
            });

            if (!allRm) {
                return res.status(500).json({
                    success: false,
                    message: 'First You need to Create National Head for Zonal Head'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Reporting Managers for Zonal Head Fetched!!!!',
                data: allRm
            });
        }
            
        // state head
        else if (req.body.designationName === 'State Head') {
            const allRm = await Employee.findAll({
                where: { designation: 'Zonal Head' }
            });

            if (!allRm) {
                return res.status(500).json({
                    success: false,
                    message: 'First You need to Create Zonal Head for State Head'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Reporting Managers for State Head Fetched!!!!',
                data: allRm
            });
        }

        // seniour Manager
        else if (req.body.designationName === 'Sr. Manager') {
            const allRm = await Employee.findAll({
                where: { designation: 'State Head' }
            });

            if (!allRm) {
                return res.status(500).json({
                    success: false,
                    message: 'First You need to Create State Head for seniour Manager'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Reporting Managers for Seniour Manager Fetched!!!!',
                data: allRm
            });
        }

        // manager 
        else if (req.body.designationName === 'Manager') {
            const allRm = await Employee.findAll({
                where: { designation: 'Sr. Manager' }
            });

            if (!allRm) {
                return res.status(500).json({
                    success: false,
                    message: 'First You need to Create Seniour Manager for Manager'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Reporting Managers for Manager Fetched!!!!',
                data: allRm
            });
        }
        // sr. executive
        else if (req.body.designationName === 'Sr. Executive') {
            const allRm = await Employee.findAll({
                where: { designation: 'Manager' }
            });

            if (!allRm) {
                return res.status(500).json({
                    success: false,
                    message: 'First You need to Create Manager for Sr. Executive'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Reporting Managers for Senoiur Executive Fetched!!!!',
                data: allRm
            });
        }

        // executive
        else if (req.body.designationName === 'Executive') {
            const allRm = await Employee.findAll({
                where: { designation: 'Sr. Executive' }
            });

            if (!allRm) {
                return res.status(500).json({
                    success: false,
                    message: 'First You need to Create Seniour Executive for Executive'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Reporting Managers for Executive Fetched!!!!',
                data: allRm
            });
        }
        
        
    } catch (err) {
        console.log('Error in Getting All RM', err);
        res.status(500).json({
            success: false,
            message: 'Error in Fetching RM details',
        })
        next(err);
    }
}

exports.editRM = async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error in Editing RM', err);
        res.status(500).json({
            success: false,
            message: 'Error in Editing RM Details',
        })
    }
}

exports.deleteRM = async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error in deleting RM', err);
        res.status(500).json({
            success: false,
            message: 'Error in Deleting RM',
        })
    }
}

//******************* */ Reporting Manager section ends here ****************/ 


exports.activatedEmployee = async (req, res, next) => {
    try {

        const activatedEmployee = await Employee.findAll({
            where: { status: "active" }
        });

        res.status(200).json({
            success: true,
            message: 'Fetched All Active Employees!!',
            data: activatedEmployee
        })
        
    } catch (err) { 
        console.log('Error in getting activated Employee', err);
        res.status(500).json({
            success: false,
            message: 'Error in getting Activated Employee'
        })
    }
}

exports.deactivatedEmployee = async (req, res, next) => {
    try {

        const deactivatedEmp = await Employee.findAll({
            where: { status: "deactive" }
        });

        res.status(200).json({
            success: true,
            message: "All Deactivated Employee",
            data: deactivatedEmp
        })
        
    } catch (err) {
        console.log('Error in Getting Deactive Employee ', err);
        res.status(500).json({
            success: false,
            message: 'Error in Getting Deativated Employe'
        })
    }
}

//******************* */ MIS Desk Details starts here ****************/ 

exports.getAllMIS = async (req, res, next) => {
    try {

        const EmployeeData = await Employee.findAll();
        
        const allMis = [];

        EmployeeData.map((item, key) => {
            const roles = item.role;
            const parsedRole = JSON.parse(roles);

            parsedRole.find(role => {
                if (role === 'MIS') {
                    allMis.push(item);
                }
            });
        });

        res.status(200).json({
            success: true,
            message: 'All MIs Deatils',
            data: allMis
        });

    } catch (err) {
        console.log('Error in Getting MIS Details', err);
        res.status(500).json({
            success: false,
            message: 'Error in Getting MIS Details',
        })
    }
}



//******************* */ MIS Desk Details ends here ****************/ 