const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "That filed are be empty"],
    },
    Address: {
      type: String,
    },
    AccountNumber: {
      type: Number,
    },
    IFSC: {
      type: String,
      required: true,
    },
    Branch_MICR_Code: {
      type: Number,
      required: true,
    },
    Branch_GSTIN: {
      type: String,
      reqired: true,
    },
    Customer_Number: {
      type: Number,
      requitred: true,
    },
    ProductType: {
      type: String,
      required: true,
    },
    AccountType: {
      type: String,
      required: true,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    AccountOpenBlance: {
      type: Number,
      required: true,
      default: 500,
    },
    BankTransactionHistory: {
      transctionHistory: [
        {
          Date: {
            type: Date,
            required: true,
          },
          EffectiveDate: {
            type: Date,
            required: true,
          },
          ChequeNumber: {
            type: String,
          },
          Branch: {
            type: String,
          },
          Description: {
            type: String,
          },
          WithdrawalAmount: {
            type: Number,
          },
          DepositAmount: {
            type: Number,
          },
          Blance: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
