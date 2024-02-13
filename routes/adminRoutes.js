const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
const multer = require('multer');

// const upload = multer({ 
//     dest: 'assets/document', // Location where files will be saved
//  });

router.get('/all-bank-names', adminController.BankNames);
// router.post('/add-bank-names', adminController.addBankNames);
// router.post('/edit-bank-name/:id', adminController.editBankname);
// router.get('/delete-bank-name/:id', adminController.deleteBankName);


router.post("/make", adminController.getAllMake);
router.post("/model", adminController.getAllModel);
router.post("/variant", adminController.getAllVariants);

router.get('/get-pos', adminController.getPos)
router.get('/get-users', adminController.getUser);
router.post('/create-pos', adminController.createPos);
router.post('/add-document', adminController.addDocument);
router.post('/pos/:id', adminController.acceptOrRejectPos);
router.get('/employee-detail/:id', adminController.getUserLeads);//to get single pos details

router.get('/dashboard', adminController.dashboardAdmin);
router.get('/search', adminController.search);


router.get('/zone', adminController.getZone);
router.get("/state/:zoneId", adminController.getState);
router.get("/states", adminController.getStates);
router.get('/district/:stateId', adminController.getDistrict);
router.get('/district', adminController.getDistricts);
router.post('/edit-user', adminController.editUserDetails);

router.get("/previous-insurer", adminController.getPreviousInsurers);


// submit offline policy routes 
router.post('/fill_policy_data', adminController.fillPolicyDetails);

// filter data
router.post('/filter_employee', adminController.filterEmployee);
router.get('/generated_policy', adminController.generatedPolicyData);


// leads management
router.post('/add_submit_data', adminController.submitOfflinePolicyData);
router.post('/submit_data',adminController.submitOfflinePolicyDataMIS)
router.post('/leadsAssign/:id', adminController.assignToMISLeads);
router.get('/pendingPool', adminController.pendingPool);
router.post('/my_pool', adminController.myPool);

module.exports = router;