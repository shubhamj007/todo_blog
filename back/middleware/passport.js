const User = require('./../models').users;
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = CONFIG.jwt.encryption;

const strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
    console.log('--Passport---jwt_payload--', jwt_payload);

    // const query = {
    //     token: jwtSimple.encode(payload, credentials.jwtSecret),
    //     expires: {$gt: new Date()}                
    // };
    // console.log('query:---------- ', query);
    // TokenSchema.findOne(query, (err, result) => {
    //     if (err) next(err, null);
    //     if (!result) next(null, null);
    //     done(null, jwt_payload);
    // });

    let err, user;
    [err, user] = await to(User.findById(jwt_payload.user_id));
    if (err) {
        console.log('--err--', err);
        return next(err, false);
    } if (user) {
        return next(null, user);
    } else {
        return next(null, false);
    }
});
module.exports = strategy;