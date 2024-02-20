const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        minlenght : 4,
        maxlenght : 12,
        trim : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlenght : 6,
        maxlenght : 25,

    },
    firstname : {
        type : String,
        required : true,
        trim : true
    },
    lastname : {
        type : String,
        required : true,
        trim : true
    }
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

// module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('Account' , accountSchema);

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};