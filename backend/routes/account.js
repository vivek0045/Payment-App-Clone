const express = require("express");
const { authMiddleware } = require("../middleware");
const {Account} = require("../models/db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;

    const account = await Account.findOne({
        userId
    });

    res.json({
        balance: account.balance
    });
    
});

router.post("/transfer", authMiddleware, async (req,res) => {
    console.log("fghjk")
    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({userId : req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!account){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId : req.userId},{ $inc : {balance: -amount}}).session(session);
    await Account.updateOne({userId : toAccount},{ $inc : {balance: amount}}).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    })
})

module.exports = router;