const express = require('express');

const isAuth = require('../middleware/jsonwebtoken')

const router = express.Router();

const posController = require('../controller/pos');

router.post('/create-customer/:id', isAuth, posController.createCustomer);
router.post('/check-policy', isAuth, posController.checkPolicy);
router.post('/update/:id', isAuth, posController.misUpdateLead);
router.get('/get-leads-type', posController.getLeadType)
router.post('/fill-data', isAuth, posController.fillAssetDetail);
router.get('/my-leads', isAuth, posController.getMyLeads);
router.get('/lead-with-value', isAuth, posController.getfilevalueleads);
router.get("/lead-with-value-mis", isAuth, posController.getMisfilevalueleads)
router.post('/quotation/:id', isAuth, posController.accept_rejectQuotation);
router.get('/get-lead-detail/:id', posController.getLeadDetails);
router.get('/addons', posController.getAddons)
router.post('/update-lead', isAuth, posController.updateLead)
router.post('/update-customer', isAuth, posController.updateCustomerDetail)
router.get('/get-city', posController.getPincodeData)
router.get('/get-company', posController.getCompany)
router.get('/get-rto', posController.getRto)
router.get('/get-nominee', posController.getNominee)
router.get('/get-leads', posController.getfilteredLeads)
router.post('/update-image', posController.updateImage)
router.post('/add-image/:id', posController.addImages)
router.get('/get-info', isAuth, posController.getMyDetails)
router.post('/send-payment/:id', isAuth, posController.sendPaymentScreenShot);

router.get("/get-customer-lead/:id", posController.getCustomerLead);

module.exports = router