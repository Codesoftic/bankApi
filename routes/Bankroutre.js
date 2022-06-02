const express = require('express');
const bancontrolers =require('../contoller/bancontrolers.js')

const router =express.Router()


router
    .route('/')
    .post(bancontrolers.createAccount)





router
    .route('/transaction')
    .get(bancontrolers.getTransaction)



router
     .route('/withdrawal')
     .patch(bancontrolers.WithdrawalAmount)   



router.route('/deposit').patch(bancontrolers.DepositAmount)

router.route('/sort').get(bancontrolers.getTransactionSortForAscending)


module.exports =router