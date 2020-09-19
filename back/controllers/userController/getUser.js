
const User = require('../../models').users;
const authService = require('./../../services/AuthService');

const get = async function (req, res) {
    [err, data] = await to(
        User.findAll({
            where: {
                is_deleted: 0
            }
        }));
    if (data) {
        return ReS(res, { data: data || [], message: "user recieved successfully" }, 200);
    }
}
module.exports.get = get;
