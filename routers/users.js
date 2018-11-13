const asyncMiddleware = require('../middleware/async');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {User,validateUser,userSchema} = require('../models/user');

router.get('/',[auth,admin], asyncMiddleware(async (req,res) => {
    const users = await User.find({});

    if(!users) return res.status(404).send('No user found');

    res.status(200).send(users);
}));

// router.get('/:id',async (req,res) => {
//     const user = await User.find({_id : req.params.id});

//     if(!user) return res.status(404).send('User not found');

//     res.status(200).send(user);
// });

router.get('/me/',auth, asyncMiddleware(async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).send(user);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send('Invalid user input');

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered.');

    // const newUser = new User({
    //     name: req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    const newUser = new User(_.pick(req.body,['name', 'email', 'password','isAdmin']));

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password,salt);

    await newUser.save();
    // const token = jwt.sign({_id: newUser._id}, config.get('jwtPrivateKey'));
    const token = newUser.generateAuthToken();
    res.header("x-auth-token-blog",token).status(200).send(_.pick(newUser,['_id','name','email', 'isAdmin']));
}));

router.delete('/:id', auth, asyncMiddleware(async (req, res) => {
    const user = await User.findOneAndDelete({_id: req.params.id});
    res.status(200).send(user);
}));

router.put('/:id', auth, asyncMiddleware(async (req,res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send('Invalid user input');

    const user = await User.findOneAndUpdate({_id:req.params.id},{
        name:req.body.name,
        email:req.body.email,
        password:req.params.password
    });

    res.status(200).send(user);
}));


module.exports=router;