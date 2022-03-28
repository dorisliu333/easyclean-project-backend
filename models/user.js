const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        // for login?
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,         
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        // for display?
        type: String,
        required: true,
        trim: true
    },
    postcode: {
        // important!!
        type: Number,
        trim: true,
        required: true
    },
    userType: {
        // ex. 1 = client, 2 = tasker, 3 = both
        type: Number,
        required: true,
    },
    mobile: {
        type: String,
        trim: true
        // unique?
    },
    description: {
        type: String,
        trim: true
    },
    // taskerDetail ref
    taskerDetail: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TaskerDetail'
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]

});
		
userSchema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12);
};

userSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
		

const User = mongoose.model('User', userSchema);
module.exports = User;
