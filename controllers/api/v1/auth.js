const User = require('../../../models/user');
const { generateToken } = require('../../../utils/jwt');
const {errorHandler} = require('../../../middleware/errorHandler');

async function login(req, res) {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }
  
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(404).json('email not found');
  }
 
  const validPassword = await user.validatePassword(password);  
  if (!validPassword) {
    return res.status(401).json('Invalid username or password');
  }
  const id=user._id;
  console.log(user);
  const token = await generateToken({id});  
  return res.json({ token, user});
}

module.exports = { login };
