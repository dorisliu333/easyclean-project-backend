const mongoose = require('mongoose');      

const taskSchema =  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength:50
    },    
    detail: {
      type: String,
      required: true,
      trim: true,
      maxLength:3000
    },
    category:{
      type: String,
      required: true,
      trim: true,
      maxLength:50
    },
    postCode:{
      type: Number,
      required: true,
      min:1000,  
      max:99990
    },
    dueDate:{
      type: String,      // Replace by date if the date data is confirmed
      required: true,
    },
/**
 * The working time include the five selection
 * 1: No special time requirement
 * 2: Morning from 6:00 to 10:00 
 * 3: MiddleDay from 10:00 to 14:00
 * 4: Afternoon from 14:00 to 18:00
 * 5: Evening  from 18:00 to 22:00 
 * */
    workingTime:{
      type: Number,
      trim: true,
      min:1,
      max:5
    },
    priceBudget:{
      type: Number,
      required:true,
      min:1,
      max:9999
    },
    clientId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref:'User'
	  },
    offers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer'
    }],
    
    status: {
    type: String,
    default: "",    
  },
  
  },
    {   
        timestamps:true,
        toJSON:{
            virtuals:true
        },
        id:false
    }  
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;