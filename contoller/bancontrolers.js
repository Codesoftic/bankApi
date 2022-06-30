const Account = require("../model/Account");
const arraySort = require("array-sort");
const fs = require("fs");
const path = require("path");

exports.createAccount = (req, res, next) => {
  const parts = req.body.Date.toString().split("-");
  var date = new Date(parts[0], parts[1] - 1, parts[2]);
  Account.create({
    name: req.body.name,
    Address: req.body.Address,
    AccountNumber: req.body.AccountNumber,
    IFSC: req.body.IFSC,
    Branch_MICR_Code: req.body.Branch_MICR_Code,
    Branch_GSTIN: req.body.Branch_GSTIN,
    Customer_Number: req.body.Customer_Number,
    ProductType: req.body.ProductType,
    AccountOnpenBlance: req.body.AccountOpenBlance,
    BankTransactionHistory: {
      transctionHistory: [
        {
          Date: date,
          EffectiveDate: date,
          Branch: req.body.Branch,
          Description: req.body.Description,
          DepositAmount: req.body.DepositAmount,
          Blance: req.body.AccountOpenBlance,
        },
      ],
    },
  })
    .then((docs) => {
      console.log(docs);
      res.status(201).json({
        docs,
      });
    })
    .catch((err) => {
      console.log(`internal server error ${err}`);
    });
};

exports.DepositAmount = async (req, res, next) => {
  console.log(req.query.AccountNumber);
  let accountNumber = await Account.findOne({
    AccountNumber: req.query.AccountNumber,
  });
  if (!accountNumber) {
    res.status(401).json({
      message: `This ${req.query.AccountNumber} accountNumber is does not exits`,
    });
  } else {
    const i =
      accountNumber.BankTransactionHistory.transctionHistory.length * 1 - 1;
    const initialBlane =
      accountNumber.BankTransactionHistory.transctionHistory[i].Blance;
    const parts = req.body.Date.toString().split("-");
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    const userTransaction = [
      ...accountNumber.BankTransactionHistory.transctionHistory,
    ];

    userTransaction.push({
      Date: date,
      EffectiveDate: date,
      Branch: req.body.Branch,
      Description: req.body.Description,
      DepositAmount: req.body.DepositAmount * 1,
      Blance: initialBlane * 1 + req.body.DepositAmount * 1,
    });

    const despositamout = {
      transctionHistory: userTransaction,
    };
    Account.findOneAndUpdate(
      {
        AccountNumber: req.query.AccountNumber,
      },
      {
        BankTransactionHistory: despositamout,
      },
      (err, doc) => {
        if (err) {
          res.status(406).json({
            message: `This ${req.query.AccountNumber} account Blance is Not be Updated`,
          });
        } else {
          res.status(202).json({
            message: "update",
            doc,
          });
        }
      }
    );
  }
};

exports.WithdrawalAmount = async (req, res, next) => {
  console.log(req.query.AccountNumber);
  let accountNumber = await Account.findOne({
    AccountNumber: req.query.AccountNumber,
  });
  if (!accountNumber) {
    res.status(401).json({
      message: `This ${req.query.AccountNumber} accountNumber is does not exits`,
    });
  } else {
    const i =
      accountNumber.BankTransactionHistory.transctionHistory.length * 1 - 1;

    const initialBlane =
      accountNumber.BankTransactionHistory.transctionHistory[i].Blance;
    const parts = req.body.Date.toString().split("-");
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    const userTransaction = [
      ...accountNumber.BankTransactionHistory.transctionHistory,
    ];

    userTransaction.push({
      Date: date,
      EffectiveDate: date,
      Branch: req.body.Branch,
      ChequeNumber: req.body.ChequeNumber,
      Description: req.body.Description,
      WithdrawalAmount: req.body.WithdrawalAmount * 1,
      Blance: initialBlane * 1 - req.body.WithdrawalAmount * 1,
    });

    const withdrawalamount = {
      transctionHistory: userTransaction,
    };
    Account.findOneAndUpdate(
      {
        AccountNumber: req.query.AccountNumber,
      },
      {
        BankTransactionHistory: withdrawalamount,
      },
      (err, doc) => {
        if (err) {
          res.status(406).json({
            message: `This ${req.query.AccountNumber} account Blance is Not be Updated`,
          });
        } else {
          res.status(202).json({
            message: "update",
            doc,
          });
        }
      }
    );
  }
};

exports.getAllBankUser = (req, res, next) => {
  Account.find()
    .then((user) => {
      res.status(200).json({
        message: "All Bank User List",
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.getAccountdeatils = async (req, res, next) => {
  console.log("getAccountdeatils");
  Account.findOne({ AccountNumber: req.params.id })
    .then((accountdeatil) => {
      console.warn(accountdeatil);
      res.status(200).json({
        account: accountdeatil,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `server could not response`,
        error: err.message,
      });
    });
};

exports.copyAccontdata = async (req, res, next) => {
  const getAccountdata = await Account.findOne({
    AccountNumber: req.params.id,
  });
  const userTransaction = [
    ...getAccountdata.BankTransactionHistory.transctionHistory,
  ];
  const copyTransaction = {
    transctionHistory: userTransaction,
  };
  const AccountNumber = Math.floor(1000 + Math.random() * 900000000000);

  Account.create({
    name: getAccountdata.name,
    Address: getAccountdata.Address,
    AccountNumber: AccountNumber,
    IFSC: getAccountdata.IFSC,
    Branch_MICR_Code: getAccountdata.Branch_MICR_Code,
    Branch_GSTIN: getAccountdata.Branch_GSTIN,
    Customer_Number: getAccountdata.Customer_Number,
    ProductType: getAccountdata.ProductType,
    AccountOnpenBlance: getAccountdata.AccountOpenBlance,
    BankTransactionHistory: copyTransaction,
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.EditBankdeatils = async (req, res, next) => {
  console.log(req.body);
  const updatedAccountdeatls = await Account.findOneAndUpdate(
    { AccountNumber: req.params.id },
    req.body,
    { new: true }
  );
  console.log(updatedAccountdeatls);
};
