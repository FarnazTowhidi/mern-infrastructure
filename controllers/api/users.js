const User = require ("../../models/user")
const jwt = require ("jsonwebtoken")
const bcrypt = require('bcrypt');

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


  async function login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log (user)
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      console.log (match)
      if (!match) throw new Error();
      res.json( createJWT(user) );
    } catch (error) {
      console.log(error) 
      res.status(400).json('Bad Credentials');
    }
  }


  function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }


  module.exports = {
    create,
    login, 
    checkToken
  };

  function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }