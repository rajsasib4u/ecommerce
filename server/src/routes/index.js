const express = require('express');
const router = express.Router();

const controller = require('../controller/index');


router.get('/selectData', controller.selectData);
router.post('/postOrders', controller.postOrders);
router.post('/myOrders', controller.myOrders);
router.post('/regUsers', controller.regUsers);
router.post('/orders', controller.orders);
router.post('/payment', controller.payment);



module.exports = router;