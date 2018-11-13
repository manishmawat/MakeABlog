const {User} = require('../models/user');

async function admin(req, res, next){
    //There are two options to verify the isAdmin role for the user
    //1) just verify the isAdmin property from token provided by user (in auth middleware, we 
    //populated req.user property with decoded token)
    //2) We can fetch the id from user tolen and validate it from database, in this case we can do the 
    //role change verification also.
    const user_isAdmin = await User.findById(req.user._id).select('isAdmin');
    if(!user_isAdmin || user_isAdmin.isAdmin !== req.user.isAdmin)
        return res.status(403).send('You do not have permission to perform this task or your roles have been revoked.');
    
    next();
}

module.exports=admin;