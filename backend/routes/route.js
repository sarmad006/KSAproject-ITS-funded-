const router = require('express').Router();

const { verifyUser, sendApproval } = require('../controller/appController.js')


/** HTTP Reqeust */
router.post('/user/verify', verifyUser);
router.post('/sendmail', sendApproval);


module.exports = router;