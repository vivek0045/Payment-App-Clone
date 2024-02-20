const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User, Account} = require("../models/db");
const { authMiddleware } = require("../middleware");
require("dotenv").config();

const router = express.Router();

const signupBody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstname : zod.string(),
    lastname : zod.string()
    
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
 
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
 
    const existingUser = await User.findOne({
        username : req.body.username
    });

    // console.log(existingUser);

    if(existingUser){
        return res.status(411).json({
            message : "Email already taken, please try again"
        });
    }
   
    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })  

    const token = jwt.sign({userId},process.env.JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
	    token: token
    })

});

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
});

router.post("/signin", async (req, res) =>{
    const { success } = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(user){
        const token = jwt.sign({userId : user._id},process.env.JWT_SECRET);

        res.status(200).json({
            message : "User login successfully",
            token : token
        });

        return;
    }

    res.status(411).json({
        message : "Error while Logging in"
    });
});

const updateBody = zod.object({
    firstname : zod.string().optional(),
    lastname : zod.string().optional(),
    password : zod.string().optional()
});

router.put("/", authMiddleware, async (req,res) =>{
    const {success}= updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({_id : req.userId}, req.body);

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    console.log('ff')
    console.log(filter)

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    console.log(users);

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = router;