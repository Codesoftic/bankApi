const express = require('express');
const bancontrolers =require('../contoller/bancontrolers.js')

const router =express.Router()


router
    .route('/')
    .post(bancontrolers.createAccount)




router
     .route('/withdrawal')
     .patch(bancontrolers.WithdrawalAmount)   



router.route('/deposit').patch(bancontrolers.DepositAmount)


router.route('/getAllBankUser').get(bancontrolers.getAllBankUser)


router.route('/check/accountdeatils/:id').get(bancontrolers.getAccountdeatils)


router.route('/copy/accountnumber/alldata/:id').get(bancontrolers.copyAccontdata)



router.route("/edit/accountnumber/:id").patch(bancontrolers.EditBankdeatils);



module.exports =router