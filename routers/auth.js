const express = require('express');
const Joi = require('joi');
const {User} = require('../models/user')
const bcrypt = require('bcrypt');

const router = express.Router();


router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    // const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    res.status(200).send(token);
});


function validate(user){
    const authSchema = {
        email:Joi.string().required().email().min(5).max(255),
        password:Joi.string().required().min(5).max(255)
    };

    return Joi.validate(user,authSchema);
}

module.exports = router;