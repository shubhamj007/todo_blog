
const createUSr = require('../../models').users;

const createuser = async function (req, res) {

    const body = req.body;
        if (!body.email) {
            return ReE(res, 'Please enter an email to register.');
        }
        if (!body.first_name) {
            return ReE(res, 'Please enter a firstname to register.');
        }
        if (!body.last_name) {
            return ReE(res, 'Please enter a lastname to register.');
        }
       
        if (!body.password) {
            return ReE(res, 'Please enter a password to register.');
        }
        
        let err, user;
        
        [err, user] = await to(createUSr.create(body));

        if (err) return ReE(res, err, 422);
       
       

        else {
            return ReS(res, { 
                            message: 'Successfully created new user.', 
                            user: user.toWeb(), 
                            token: user.getJWT()
                        }, 201);
        }


}
module.exports.createuser = createuser;