const credentials = {
    client: {
        id: "74419416-8321-41ae-a169-cc211e18ac71",
        secret: "jkJSCRC33(%{lijlvZC572:",
    },
    auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
    }
};

const authForData = [
    'https://api.devsubdomain.com/api/mailer/authorize',
    'openid profile offline_access User.Read Mail.ReadWrite Mail.Send'
];

module.exports.credentials = credentials;
module.exports.authForData = authForData;