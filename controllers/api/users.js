const User = require ("../../models/user")
const jwt = require ("jsonwebtoken")
async function create(req, res) {
    try {
      const user = await User.create(req.body);
      const token = createJWT(user);
      res.json(token);
    }
    catch (err) {
       res.status(400).json(err);
       console.log (err)
    }
    
  }
  module.exports = {
    create,
  };

  function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }