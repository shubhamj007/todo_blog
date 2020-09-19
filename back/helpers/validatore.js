const Validatore = {};
const MailComposer = require('nodemailer/lib/mail-composer');
var mimemessage = require('mimemessage');

Validatore.validateSendMail = function (req, res, next) {
    var message = {};
    var body = req.body.mail;
    message.subject = body.message.subject;
    message.body = body.message.body;
    let error = false;
    if (req.body.provider === "outlook") {
        if (body.message.toRecipients.length > 0) {
            message.toRecipients = [];
            for (var i = 0; i < body.message.toRecipients.length; i++) {
                message.toRecipients.push({
                    "emailAddress": {
                        "address": body.message.toRecipients[i]
                    }
                });
            }
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }

        if (body.message.BccRecipients.length > 0) {
            message.BccRecipients = [];
            for (var i = 0; i < body.message.BccRecipients.length; i++) {
                message.BccRecipients.push({
                    "emailAddress": {
                        "address": body.message.BccRecipients[i]
                    }
                });
            }
        }

        if (body.message.CcRecipients.length > 0) {
            message.CcRecipients = [];
            for (var i = 0; i < body.message.CcRecipients.length; i++) {
                message.CcRecipients.push({
                    "emailAddress": {
                        "address": body.message.CcRecipients[i]
                    }
                });
            }
        }

        if (body.message.Attachments.length > 0) {
            message.Attachments = [];
            for (var i = 0; i < body.message.Attachments.length; i++) {
                message.Attachments.push({
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "Name": body.message.Attachments[i].name,
                    "ContentBytes": body.message.Attachments[i].contentBytes
                });
            }
        }

        if (body.message.Categories.length > 0) {
            message.Categories = body.message.Categories;
        }

        if (!error) {
            req.body.mail.message = message;
            next();
        }
    } else if (req.body.provider === "google") {
        if (body.message.toRecipients.length > 0) {
            var emailData = {
                to: body.message.toRecipients.join(),
                cc: body.message.CcRecipients.join(),
                Bcc: body.message.BccRecipients.join(),
                text: body.message.body.content,
                html: body.message.body.content,
                subject: body.message.subject,
                textEncoding: "base64"
            };
            if (body.message.Attachments.length > 0) {
                emailData.attachments = [];
                for (var i = 0; i < body.message.Attachments.length; i++) {
                    emailData.attachments.push({
                        encoding: 'base64',
                        filename: body.message.Attachments[i].name,
                        content: body.message.Attachments[i].contentBytes
                    });
                }
            }
            messageObj = new MailComposer(emailData);
            messageObj.compile().build(function (error, msg) {
                if (error) return console.log('Error compiling email ' + error);
                req.body.mail.message = msg;
                next();
            });
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }
    } else {
        if (body.message.toRecipients.length > 0) {
            var emailData = {
                to: body.message.toRecipients.join(),
                cc: body.message.CcRecipients.join(),
                Bcc: body.message.BccRecipients.join(),
                text: body.message.body.content,
                html: body.message.body.content,
                subject: body.message.subject,
                textEncoding: "base64"
            };
            if (body.message.Attachments.length > 0) {
                emailData.attachments = [];
                for (var i = 0; i < body.message.Attachments.length; i++) {
                    emailData.attachments.push({
                        encoding: 'base64',
                        filename: body.message.Attachments[i].name,
                        content: body.message.Attachments[i].contentBytes
                    });
                }
            }
            req.body.mail.message = emailData;
            next();
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }
    }
}


Validatore.validateCreateMail = function (req, res, next) {
    var message = {};
    var body = req.body.mail;
    message.subject = body.message.subject;
    message.body = body.message.body;
    let error = false;
    if (req.body.provider === "outlook") {
        if (body.message.toRecipients.length > 0) {
            message.toRecipients = [];
            for (var i = 0; i < body.message.toRecipients.length; i++) {
                message.toRecipients.push({
                    "emailAddress": {
                        "address": body.message.toRecipients[i]
                    }
                });
            }
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }

        if (body.message.BccRecipients.length > 0) {
            message.BccRecipients = [];
            for (var i = 0; i < body.message.BccRecipients.length; i++) {
                message.BccRecipients.push({
                    "emailAddress": {
                        "address": body.message.BccRecipients[i]
                    }
                });
            }
        }

        if (body.message.CcRecipients.length > 0) {
            message.CcRecipients = [];
            for (var i = 0; i < body.message.CcRecipients.length; i++) {
                message.CcRecipients.push({
                    "emailAddress": {
                        "address": body.message.CcRecipients[i]
                    }
                });
            }
        }

        if (body.message.Attachments.length > 0) {
            message.Attachments = [];
            for (var i = 0; i < body.message.Attachments.length; i++) {
                message.Attachments.push({
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "Name": body.message.Attachments[i].name,
                    "ContentBytes": body.message.Attachments[i].contentBytes
                });
            }
        }

        if (body.message.Categories.length > 0) {
            message.Categories = body.message.Categories;
        }

        if (!error) {
            req.body.mail.message = message;
            next();
        }
    } else if (req.body.provider === "google") {
        if (body.message.toRecipients.length > 0) {
            var emailData = {
                to: body.message.toRecipients.join(),
                cc: body.message.CcRecipients.join(),
                Bcc: body.message.BccRecipients.join(),
                text: body.message.body.content,
                html: body.message.body.content,
                subject: body.message.subject,
                textEncoding: "base64"
            };
            if (body.message.Attachments.length > 0) {
                emailData.attachments = [];
                for (var i = 0; i < body.message.Attachments.length; i++) {
                    emailData.attachments.push({
                        encoding: 'base64',
                        filename: body.message.Attachments[i].name,
                        content: body.message.Attachments[i].contentBytes
                    });
                }
            }
            messageObj = new MailComposer(emailData);
            messageObj.compile().build(function (error, msg) {
                if (error) return console.log('Error compiling email ' + error);
                req.body.mail.message = msg;
                next();
            });
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }
    } else {
        let msg, htmlEntity, plainEntity, fileEntity;
        msg = mimemessage.factory({
            contentType: 'multipart/alternate',
            body: []
        });
        htmlEntity = mimemessage.factory({
            contentType: 'text/html;charset=utf-8',
            body: body.message.body.content
        });
        plainEntity = mimemessage.factory({
            body: body.message.body.content
        });
        msg.header('To', body.message.toRecipients.join());
        msg.header('Cc', body.message.CcRecipients.join());
        msg.header('Bcc', body.message.BccRecipients.join());
        msg.header('Subject', body.message.subject);
        msg.header('date', new Date());
        msg.body.push(plainEntity);
        msg.body.push(htmlEntity);
        if (body.message.Attachments.length > 0) {
            for (var i = 0; i < body.message.Attachments.length; i++) {
                fileEntity = mimemessage.factory({
                    contentTransferEncoding: 'base64',
                    body: body.message.Attachments[i].contentBytes
                });
                fileEntity.header('Content-Disposition', 'attachment ;filename="' + body.message.Attachments[i].name + '"');
                msg.body.push(fileEntity);
            }
        }
        req.body.mail.message = msg;
        next();
    }
}

Validatore.validateReplyCreateMail = function (req, res, next) {
    var message = {};
    var body = req.body.mail;
    message.subject = body.message.subject;
    message.body = body.message.body;
    let error = false;
    if (req.body.provider === "google") {
        if (body.message.toRecipients.length > 0) {
            var emailData = {
                to: body.message.toRecipients.join(),
                cc: body.message.CcRecipients.join(),
                Bcc: body.message.BccRecipients.join(),
                text: body.message.body.content,
                html: body.message.body.content,
                subject: body.message.subject,
                'message-id': req.body.mail_id,
                textEncoding: "base64"
            };
            if (body.message.Attachments.length > 0) {
                emailData.attachments = [];
                for (var i = 0; i < body.message.Attachments.length; i++) {
                    emailData.attachments.push({
                        encoding: 'base64',
                        filename: body.message.Attachments[i].name,
                        content: body.message.Attachments[i].contentBytes
                    });
                }
            }
            messageObj = new MailComposer(emailData);
            messageObj.compile().build(function (error, msg) {
                if (error) return console.log('Error compiling email ' + error);
                req.body.mail.message = msg;
                next();
            });
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }
    } else if (req.body.provider === "outlook") {
        if (body.message.toRecipients.length > 0) {
            message.toRecipients = [];
            for (var i = 0; i < body.message.toRecipients.length; i++) {
                message.toRecipients.push({
                    "emailAddress": {
                        "address": body.message.toRecipients[i]
                    }
                });
            }
        }

        if (body.message.BccRecipients.length > 0) {
            message.BccRecipients = [];
            for (var i = 0; i < body.message.BccRecipients.length; i++) {
                message.BccRecipients.push({
                    "emailAddress": {
                        "address": body.message.BccRecipients[i]
                    }
                });
            }
        }

        if (body.message.CcRecipients.length > 0) {
            message.CcRecipients = [];
            for (var i = 0; i < body.message.CcRecipients.length; i++) {
                message.CcRecipients.push({
                    "emailAddress": {
                        "address": body.message.CcRecipients[i]
                    }
                });
            }
        }

        if (body.message.Attachments.length > 0) {
            message.Attachments = [];
            for (var i = 0; i < body.message.Attachments.length; i++) {
                message.Attachments.push({
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "Name": body.message.Attachments[i].name,
                    "ContentBytes": body.message.Attachments[i].contentBytes
                });
            }
        }

        if (body.message.Categories.length > 0) {
            message.Categories = body.message.Categories;
        }
        if (!error) {
            req.body.mail.message = message;
            next();
        }
    } else {
        let msg, htmlEntity, plainEntity, fileEntity;
        msg = mimemessage.factory({
            contentType: 'multipart/alternate',
            body: []
        });
        htmlEntity = mimemessage.factory({
            contentType: 'text/html;charset=utf-8',
            body: body.message.body.content
        });
        plainEntity = mimemessage.factory({
            body: body.message.body.content
        });
        msg.header('To', body.message.toRecipients.join());
        msg.header('Cc', body.message.CcRecipients.join());
        msg.header('Bcc', body.message.BccRecipients.join());
        msg.header('Subject', body.message.subject);
        msg.header('message-id', req.body.mail_id);
        msg.header('date', new Date());
        msg.body.push(plainEntity);
        msg.body.push(htmlEntity);
        if (body.message.Attachments.length > 0) {
            for (var i = 0; i < body.message.Attachments.length; i++) {
                fileEntity = mimemessage.factory({
                    contentTransferEncoding: 'base64',
                    body: body.message.Attachments[i].contentBytes
                });
                fileEntity.header('Content-Disposition', 'attachment ;filename="' + body.message.Attachments[i].name + '"');
                msg.body.push(fileEntity);
            }
        }
        req.body.mail.message = msg;
        next();
    }
};

Validatore.validateReplySendMail = function (req, res, next) {
    var message = {};
    var body = req.body.mail;
    message.subject = body.message.subject;
    message.body = body.message.body;
    let error = false;
    if (req.body.provider === "google") {
        if (body.message.toRecipients.length > 0) {
            var emailData = {
                to: body.message.toRecipients.join(),
                cc: body.message.CcRecipients.join(),
                Bcc: body.message.BccRecipients.join(),
                text: body.message.body.content,
                html: body.message.body.content,
                subject: body.message.subject,
                'message-id': req.body.mail_id,
                textEncoding: "base64"
            };
            if (body.message.Attachments.length > 0) {
                emailData.attachments = [];
                for (var i = 0; i < body.message.Attachments.length; i++) {
                    emailData.attachments.push({
                        encoding: 'base64',
                        filename: body.message.Attachments[i].name,
                        content: body.message.Attachments[i].contentBytes
                    });
                }
            }
            messageObj = new MailComposer(emailData);
            messageObj.compile().build(function (error, msg) {
                if (error) return console.log('Error compiling email ' + error);
                req.body.mail.message = msg;
                next();
            });
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }
    } else if (req.body.provider === "outlook") {
        if (body.message.toRecipients.length > 0) {
            message.toRecipients = [];
            for (var i = 0; i < body.message.toRecipients.length; i++) {
                message.toRecipients.push({
                    "emailAddress": {
                        "address": body.message.toRecipients[i]
                    }
                });
            }
        }

        if (body.message.BccRecipients.length > 0) {
            message.BccRecipients = [];
            for (var i = 0; i < body.message.BccRecipients.length; i++) {
                message.BccRecipients.push({
                    "emailAddress": {
                        "address": body.message.BccRecipients[i]
                    }
                });
            }
        }

        if (body.message.CcRecipients.length > 0) {
            message.CcRecipients = [];
            for (var i = 0; i < body.message.CcRecipients.length; i++) {
                message.CcRecipients.push({
                    "emailAddress": {
                        "address": body.message.CcRecipients[i]
                    }
                });
            }
        }

        if (body.message.Attachments.length > 0) {
            message.Attachments = [];
            for (var i = 0; i < body.message.Attachments.length; i++) {
                message.Attachments.push({
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "Name": body.message.Attachments[i].name,
                    "ContentBytes": body.message.Attachments[i].contentBytes
                });
            }
        }

        if (body.message.Categories.length > 0) {
            message.Categories = body.message.Categories;
        }
        if (!error) {
            req.body.mail.message = message;
            next();
        }
    } else {
        if (body.message.toRecipients.length > 0) {
            var emailData = {
                to: body.message.toRecipients.join(),
                cc: body.message.CcRecipients.join(),
                Bcc: body.message.BccRecipients.join(),
                text: body.message.body.content,
                html: body.message.body.content,
                subject: body.message.subject,
                uid: req.body.mail_id,
                textEncoding: "base64"
            };
            if (body.message.Attachments.length > 0) {
                emailData.attachments = [];
                for (var i = 0; i < body.message.Attachments.length; i++) {
                    emailData.attachments.push({
                        encoding: 'base64',
                        filename: body.message.Attachments[i].name,
                        content: body.message.Attachments[i].contentBytes
                    });
                }
            }
            req.body.mail.message = emailData;
            next()
        } else {
            error = true;
            res.json({ status: "Error", message: "Kindly select atleast one recipients" });
        }
    }
};

Validatore.generateRequest = function (req, res, next) {
    var error = {};
    var isError = false;
    if (req.body.graph_user_name === undefined) {
        isError = true;
        error.status = "Error";
        error.message = "Email username can't empty";
    }
    if (isError) {
        res.json(error);
    } else {
        next();
    }
}

module.exports = Validatore;