const MailerToken = require('./../models').mailer_token;
const inspect = require('util').inspect;
function Auth(credentials, authForData) {
  this.credentials = credentials;
  this.authForData = authForData;
  this.oauth2 = require('simple-oauth2').create(this.credentials);
  this.jwt = require('jsonwebtoken');
}

Auth.prototype.getAuthUrl = function () {
  const returnVal = this.oauth2.authorizationCode.authorizeURL({
    redirect_uri: this.authForData[0],
    scope: this.authForData[1]
  });
  return returnVal;
}

Auth.prototype.getTokenFromCode = async function (auth_code, res) {
  let result = await this.oauth2.authorizationCode.getToken({
    code: auth_code,
    redirect_uri: this.authForData[0],
    scope: this.authForData[1]
  });

  
  const token = this.oauth2.accessToken.create(result);
  let tokenVerify = await this.saveVauesToDb(token, false);
  if (tokenVerify) {
    return token.token.access_token;
  } else {
    return false;
  }
};

Auth.prototype.getAccessToken = async function (email_user) {
  let emailError, emailUser;
  [emailError, emailUser] = await to(
    MailerToken.findAll({
      attributes: ['mailer_token', MailerToken.sequelize.literal(`(SELECT  DATE_ADD(NOW(), INTERVAL -1 HOUR))`)],
      where: { email_user: email_user, status: "Done", updated_at: { $gte: MailerToken.sequelize.literal(`(SELECT  DATE_ADD(NOW(), INTERVAL -1 HOUR))`) } }
    }).map(el => el.get({ plain: true }))
  );
  if (!emailError && emailUser.length > 0) {
    return emailUser[0].mailer_token;
  } else {
    let refreshErr, refreshTokenUser;
    [refreshErr, refreshTokenUser] = await to(
      MailerToken.findAll({
        attributes: ['mailer_refresh_token'],
        where: { email_user: email_user, status: "Done", updated_at: { $gte: MailerToken.sequelize.literal(`(SELECT  DATE_ADD(NOW(), INTERVAL -2 HOUR))`) } }
      }).map(el => el.get({ plain: true }))
    );
    if (!refreshErr && refreshTokenUser.length > 0) {
      const newToken = await this.oauth2.accessToken.create({ refresh_token: refreshTokenUser[0].mailer_refresh_token }).refresh();
      this.saveVauesToDb(newToken, true);
      return newToken.token.access_token;
    } else {
      return false;
    }
  }
};

Auth.prototype.saveVauesToDb = async function (token, res) {
  const user = this.jwt.decode(token.token.id_token);
  console.log(inspect(user, true, 8));
  let emailError, emailUser;
  [emailError, emailUser] = await to(
    MailerToken.findAll({
      attributes: ['email_user'],
      where: { email_user: user.preferred_username, status: "Pending" }
    })
  )
  if (emailUser.length > 0 || res) {
    let err, userUpdate;
    [err, userUpdate] = await to(MailerToken.update({
      mailer_token: token.token.access_token,
      mailer_refresh_token: token.token.refresh_token,
      status: "Done"
    }, {
        where: { email_user: user.preferred_username }
      })
    );
    if (!err) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

Auth.prototype.clearToken = async function (emailUserName) {
  let err, email_user;
  [err, email_users] = await to(
    MailerToken.destroy({
      where: { email_user: emailUserName }
    })
  );
  if (err) {
    return false;
  } else {
    return true;
  }
}

Auth.prototype.createTokenRequest = async function (userName) {
  const userTokenObj = {
    email_user: userName,
    status: "Pending",
    mailer_token: "",
    mailer_refresh_token: "",
    mailer_token_id: 1
  }
  let err, status;
  [err, status] = await to(
    MailerToken.create(userTokenObj)
  );
  if (err) {
    return false;
  } else {
    return true;
  }
};
module.exports = Auth;