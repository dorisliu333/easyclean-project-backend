const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,      
      ref:'Task'  
    },
    /** This userId is refer to user who post the comments
     * The MVP can only have include the basic info.
    */ 
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,      
      ref:'User'  
    },

    /** The user role can be the following 
     * 1 client who post the task,this can be judge by Task-clientId
     * 2 tasker who took the job, this can be judged from the offer-taskerId
     * 3 common people who have some things to said.
     */
    userRole:{
      type: Number,
      required:true,
      min:5,  
      max:9999
    }, 
    /** The isPublicComment can be the following 
     * 1 The Client and the Tasker can select whether show the comments between 
     * them to show to others. 
     */

    isPublicComment:{
      type: Boolean,
      required:true,
      default:true,
    }, 

  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;