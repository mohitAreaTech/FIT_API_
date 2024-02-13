const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee-controller');


// designation routes
router.post('/create_designation', employeeController.createDesignation); // create Designation
router.post('/edit_designation/:id', employeeController.editDesignation); // edit designation
router.get('/get_designation', employeeController.getAllDesignation); // all designation
router.delete('/delete_designation/:id', employeeController.deleteDesignation); // delete designation

// role routes
router.post('/create_role', employeeController.createRole); // create Role
router.get('/edit_role/:id', employeeController.editRole); // edit role
router.delete('/delete_role', employeeController.deleteRole); // delete Role
router.get('/read_role', employeeController.getAllRoles); // get All Roles

// employee routes
router.post('/create-employee', employeeController.createEmployee); // create employee
router.post('/update-employee/:id', employeeController.updateEmployee); // edit employee
router.get("/getAllEmployees", employeeController.getAllEmployees); // get all employee
router.delete("/delete-employee/:id", employeeController.deleteEmployee); // delete employee
router.get('/employee_details/:id', employeeController.EmployeeDetails);  // employee details
router.post('/activateOrDeactivate/:id', employeeController.activateDeativatEmployee); // deactivate or activate employee 

// department routes
router.post('/create_department', employeeController.createDepartment); // create Department
router.post('/update_department/:id', employeeController.editDepartment); // edit department
router.get('/all_department', employeeController.getAllDepartment); // all department
router.delete('/delete_department', employeeController.deleteDepartment); // delete department

// reporting manager
router.post('/create_rm', employeeController.createReportingManger); // create Reporting Manager
router.post('/get_rm', employeeController.getAllRM); // get all Rm Details
router.post('/update_rm', employeeController.editRM); // Edit Rm
router.delete('/delete_rm', employeeController.deleteRM); // delete Rm Details

// get Activated and deactivated Employee
router.get('/get_activated_employee', employeeController.activatedEmployee);
router.get('/get_deactivated_employee', employeeController.deactivatedEmployee);

// MIS details
router.get('/get_MIS', employeeController.getAllMIS);

module.exports = router