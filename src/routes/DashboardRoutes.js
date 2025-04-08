const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');
const { estAuthentifie } = require('../middlewares/auth');

router.get('/', estAuthentifie, dashboardController.getDashboardData);

module.exports = router;
