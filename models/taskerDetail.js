const mongoose = require('mongoose');

const taskerDetailSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    address:{
            type: String,
            required: true,
            trim: true
        },

    bankAccount: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
    phoneNumber:{
            type: String,
            unique: true,
            required: true,
            trim: true
    },
/** The Image is supposed to be used as path of Images
 *  It also can be solution for image saving in the database
 *  Currently we do not have technical solution detail to do this. 
 *  The MVP solution can have a string there for path. 
 */
    image:{
            type: String,
            unique: true,
            required: true,
            trim: true
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }
});

		
const TaskerDetail = mongoose.model('TaskerDetail', taskerDetailSchema);
module.exports = TaskerDetail;
