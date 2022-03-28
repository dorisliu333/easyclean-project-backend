const TaskerDetail = require('../../../models/taskerDetail');
const User = require('../../../models/user');
const {errorHandler} = require('../../../middleware/errorHandler');

// POST one taskerDetail
exports.store = async (req, res) => {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }

  const { name, address, bankAccount, phoneNumber, image, user } = req.body;
  try {
  const taskerDetail = new TaskerDetail({ name, address, bankAccount, phoneNumber, image, user });
  const tasker = await User.findOneAndUpdate(
    {_id: user },
    {
      taskerDetail: taskerDetail
    },
    {new:true}    
    );
  if (!tasker) {
    return res.sendStatus(404);
  }
  await taskerDetail.save();
  return res.status(201).json(taskerDetail);
  } catch(e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
}

// GET all taskerDetails
exports.index = async (req, res) => {
  const taskerDetails = await TaskerDetail.find().exec();
  return res.json(taskerDetails);
}

// GET one taskerDetail 
exports.show = async (req, res) => {
  const { id } = req.params;
  const taskerDetail = await TaskerDetail.findById(id).exec();
  if (!taskerDetail) {
    return res.sendStatus(404);
  }
  return res.json(taskerDetail);
}

// PUT one taskerDetail
exports.update = async (req, res) => {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }
  
  const { id } = req.params;
  const { name, address, bankAccount, phoneNumber, image } = req.body;
  const taskerDetail = await TaskerDetail.findByIdAndUpdate(
    id,
    { name, address, bankAccount, phoneNumber, image },
    { new: true }
  );
  if (!taskerDetail) {
    return res.sendStatus(404);
  }
  return res.json(taskerDetail);
}

// DELETE one taskerDetail
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const taskerDetail = await TaskerDetail.findByIdAndDelete(id);
  if (!taskerDetail) {
    return res.sendStatus(404);
  }
  /* await User.updateOne(
    {
      taskerDetails: taskerDetail.id
    },
    {
      $pull: {
        taskerDetails: taskerDetail.id
      }
  ); */
  return res.sendStatus(204);
}

