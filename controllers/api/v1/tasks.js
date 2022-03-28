const Task = require('../../../models/task');
const User = require('../../../models/user');
const { errorHandler } = require('../../../middleware/errorHandler');

async function createTask(req, res) {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }

  const { 
    title, 
    detail, 
    category, 
    postCode, 
    dueDate, 
    workingTime, 
    priceBudget, 
    clientId 
  } = req.body;
  const task = new Task({
    title,
    detail,
    category,
    postCode,
    dueDate,
    workingTime,
    priceBudget,
    clientId,
  });
  const client = await User.findOne({ _id: clientId }).exec();
  if (!client) {
    return res.sendStatus(404);
  }

  await task.save();
  return res.status(201).json(task);
}

async function index(req, res) {
  const { topN } = req.body; //try catch ......
  if (Number.isNaN(topN)) {
    const tasks = await Task.find().exec();
    return res.json(tasks);
  }
  const tasks = await Task.find().sort({ _id: -1 }).limit(topN);
  if (!tasks) {
    return res.sendStatus(404);
  }
  return res.json(tasks);
  //
}

// GET task by id
async function show(req, res) {
  const { id } = req.params;
  const task = await Task.findById(id)
    .populate({
      path: 'clientId',
      select: 'username',
    })
    .populate({
      path: 'offers',
      populate: {
        path: 'user',
        select: 'username',
      },
    })
    .exec();
  if (!task) {
    return res.sendStatus(404);
  }

  return res.json(task);
}

async function update(req, res) {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }

  const { id } = req.params;
  const { title, detail, category, postCode, dueDate, workingTime, priceBudget } = req.body;
  const task = await Task.findByIdAndUpdate(
    id,
    { title, detail, category, postCode, dueDate, workingTime, priceBudget },
    { new: true },
  );
  if (!task) {
    console.log('Task does not exist');
    return res.sendStatus(404);
  }
  return res.json(task);
}

async function destroy(req, res) {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id).exec();
  if (!task) {
    return res.sendStatus(404);
  }
  return res.sendStatus(204);
}

async function updateTaskStatus(req,res){
  const { id } = req.params;
  const task = await Task.findById(id).exec();
  if (!task) {
    return res.sendStatus(404);
  }
  const { status } = req.params;
  task.status=status;
  await task.save();
  return res.status(201).json(task);  
}

module.exports = {
  createTask,
  index,
  show,
  update,
  destroy,
  updateTaskStatus,
};
