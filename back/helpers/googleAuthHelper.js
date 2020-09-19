process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const { google } = require('googleapis');
const MailerToken = require('../models').mailer_token;
const TOKEN_PATH = __dirname + '/../config/googletoken.json';
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
let googleAppAuth = function () {
    const fileContent = fs.readFileSync(TOKEN_PATH);
    this.googleTokenData = JSON.parse(fileContent);
}

googleAppAuth.prototype.getAccessUrl = async function() {
  const { client_secret, client_id, redirect_uris } = this.googleTokenData.installed;
  var oAuth2Client = await new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const authUrl = await oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
}

googleAppAuth.prototype.authorize = async function (code, callback) {
    const { client_secret, client_id, redirect_uris } = this.googleTokenData.installed;
    var oAuth2Client = await new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    var token = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(token.tokens);
    var gmail = google.gmail({
        auth: oAuth2Client,
        version: 'v1'
    });
    var _that = this;
    gmail.users.getProfile({
        'userId': 'me'
    }, function (err, user) {
        if (err) return callback(err);
        const userEmail = user.data.emailAddress;
        _that.saveVauesToDb(userEmail, token.tokens, (saveStatus) => {
            if (saveStatus) {
                callback(false, token.tokens);
            } else {
                callback(false, false);
            }
        });
    });
};

googleAppAuth.prototype.saveVauesToDb = async function (user, token, callback) {
    let emailError, emailUser;
    [emailError, emailUser] = await to(
        MailerToken.findAll({
            attributes: ['email_user'],
            where: { email_user: user, status: "Pending" }
        }).map(el => el.get({ plain: true }))
    );

    if (emailUser.length > 0) {
        let err, userUpdate;
        [err, userUpdate] = await to(MailerToken.update({
            mailer_token: token.access_token,
            mailer_refresh_token: token.refresh_token,
            status: "Done"
        }, {
                where: { email_user: user }
            })
        );
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    } else {
        callback(false);
    }
};

googleAppAuth.prototype.getAccessToken = async function (email_user) {
    let emailError, emailUser;
    [emailError, emailUser] = await to(
        MailerToken.findAll({
            attributes: ['mailer_token', 'mailer_refresh_token', MailerToken.sequelize.literal(`(SELECT  DATE_ADD(NOW(), INTERVAL -4 HOUR))`)],
            where: { email_user: email_user, status: "Done", updated_at: { $gte: MailerToken.sequelize.literal(`(SELECT  DATE_ADD(NOW(), INTERVAL -4 HOUR))`) } }
        }).map(el => el.get({ plain: true }))
    );
    if (!emailError && emailUser.length > 0) {
        const { client_secret, client_id, redirect_uris } = this.googleTokenData.installed;
        var oAuth2Client = await new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        var token = {
            access_token: emailUser[0].mailer_token,
            refresh_token: emailUser[0].mailer_refresh_token
        }
        oAuth2Client.setCredentials(token);
        var gmail = google.gmail({
            auth: oAuth2Client,
            version: 'v1'
        });
        return gmail;
    } else {
        return false;
    }
};

googleAppAuth.prototype.clearToken = async function (emailUserName) {
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

googleAppAuth.prototype.createTokenRequest = async function (userName) {
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

module.exports = googleAppAuth;

