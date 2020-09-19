/**
 * Created by cis on 9/8/18.
 */
const User = require('../../models').users;
const PasswordReset = require('../../models').password_resets;

const remove = async function (req, res) {
    let userId = req.params.id;
    let [err, user] = await to(User.findById(userId));

    if (err) {
        return ReE(res, { message: "user does not exist" }, 422);
    }
    let userEmail = user.email;
    // functon for hard delete user
    [err, user] = await to(User.destroy({
        where : {id: userId}
    }));
  
    [err, userDel] = await to(PasswordReset.destroy({ where: { email: userEmail } }));

    return ReS(res, { message: 'User Deleted' }, 200);
}
module.exports.remove = remove;


/**
 * ALTER TABLE `users` ADD `is_deleted` TINYINT(1) NOT NULL DEFAULT '0' AFTER `password`;
 */