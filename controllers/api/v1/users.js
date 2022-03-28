const User = require('../../../models/user');
const TaskerDetail = require('../../../models/taskerDetail');
const { generateToken, validateToken } = require('../../../utils/jwt');
const {errorHandler} = require('../../../middleware/errorHandler');

// PUT one user
exports.update = async (req, res) => {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }
  
  const { id } = req.params;
  const { username, password, postcode, mobile, description } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      username,
      password,
      postcode,
      mobile,
      description,
    },
    {
      new: true,
    },
  );
  if (!user) {
    return res.sendStatus(404);
  }
  return res.json(user);
  
};

// DELETE one user
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.sendStatus(404);
  }
  /* await User.updateMany(
    {
      _id: { $in: u.courses }
    },
    // {
    //   students: student._id
    // },
    {
      $pull: {
        students: student._id
      }
    }
  ); */
  res.json(user);
  return res.sendStatus(204);
      
};

// POST/create one user
exports.store = async (req, res) => {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }
  const { email, password, username, postcode, userType } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).json('User already exist');
    }
    // Token load should be user_id and user_name. The other information can not put to token.
    const user = new User({ email, password, username, postcode, userType });
    await user.hashPassword();
    await user.save();
    const id = user._id;
    const token = await generateToken({ id });
    console.log(user);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// GET one user
exports.show = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('taskerDetail').exec();
  if (!user) {
    return res.sendStatus(404);
  }
  return res.json(user);
};

// GET all users
exports.index = async (req, res) => {
  const users = await User.find().exec();
  return res.json(users);
};

exports.getUserByToken = async (req, res) => {
  console.log('get User by Token');
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res.status(401).json('invalid request');
  }
  try {
    const authToken = req.headers.authorization.split(' ');
    if (authToken[0] !== 'Bearer') {
      return res.status(401).send('invalid request');
    }
    const authResult = validateToken(authToken[1]);
    if (!authResult) {
      
      return res.status(403).json('invalid token');
    }
    const user = await User.findById(authResult.id).exec();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(403).json('invalid request');
  }
};
