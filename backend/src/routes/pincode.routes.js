const express = require('express');
const router = express.Router();
const pincodeController = require('../controllers/pincode.controller');

// Main exploration APIs
router.get('/states', pincodeController.getAllStates);
router.get('/states/:state/districts', pincodeController.getDistrictsByState);
router.get('/states/:state/districts/:district/taluks', pincodeController.getTaluksByDistrict);
router.get('/pincodes', pincodeController.getPincodes);

// Search and Detail
router.get('/search', pincodeController.searchPincodes);
router.get('/pincode/:pincode', pincodeController.getPincodeDetails);

// Dashboard Stats
router.get('/stats', pincodeController.getDashboardStats);
router.get('/stats/state-distribution', pincodeController.getStateDistribution);
router.get('/stats/delivery-distribution', pincodeController.getDeliveryDistribution);

// Export
router.get('/export', pincodeController.exportCSV);

module.exports = router;
