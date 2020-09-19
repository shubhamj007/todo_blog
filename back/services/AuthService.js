const User 			= require('./../models').users;
const validator     = require('validator');

const getUniqueKey = function(body){
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else{
            unique_key = null;
        }
    }  
    return unique_key;
};
module.exports.getUniqueKey = getUniqueKey;

const authUser = async function(userInfo){
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKey(userInfo);
    console.log('unique_key:------------------- ', unique_key);

    if(!unique_key) TE('Please enter an email to login');

    if(!userInfo.password) TE('Please enter a password to login');

    let user;
    if(validator.isEmail(unique_key)){
        auth_info.method='email';

        [err, user] = await to(User.findOne({where:{email:unique_key, is_deleted:'0'}}));
        console.log(err, user, unique_key);
        if(err) TE(err.message);

    }else{
        TE(' A valid email address was not entered.');
    }

    if(!user) TE('User Not Registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);
    return user;
    
}
module.exports.authUser = authUser;