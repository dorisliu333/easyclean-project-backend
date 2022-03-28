const {ObjectId} = require('mongoose'); 
const Task = require('../../../models/task');

 
async function showByClientId(req,res) {
    const { client }=req.query;
    const tasks= await Task.find(
        {clientId:client}
    ).populate({ path: 'clientId', select: 'username email' }).exec();
    // query.getFilter();       

    if(!tasks){
        return res.sendStatus(404);
    }
    return res.json(tasks);
}

async function update(req,res){
    const { id } = req.params;
    const {title, detail, category,postCode,dueDate,
    workingTime, priceBudget}=req.body;
    const task = await Task.findByIdAndUpdate(id,{title, detail, category,postCode,dueDate,
    workingTime, priceBudget},{new:true});   
    if(!task){
        console.log('The course does not exist');
        return res.sendStatus(404);
    }
    return res.json(task); 
}

function destroy(req,res){
    const { id } = req.params;
    const task = Task.findByIdAndDelete(id).populate("User");   
    if(!task){
        console.log('The course does not exist');
        return res.sendStatus(404);
    }
    return res.sendStatus(204); 
}





module.exports = {

showByClientId

};
