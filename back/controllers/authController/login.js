const authService   = require('./../../services/AuthService');
const jwt = require('jsonwebtoken');
/**
 *! User Login
*/
const login = async function(req, res){
    
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(body));
    if(err) {
        return ReE(res, err, 422);
    }

    return ReS(res, {
        message: "You are successfully logged in.",
        token: user.getJWT(),
        user: user.toWeb()
      });
}
module.exports.login = login