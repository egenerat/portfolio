const constants = require("../config/constants/constants.js");
const logger = require("./logger.js");
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: constants.EMAIL_ACCOUNT_USERNAME,
        pass: constants.EMAIL_ACCOUNT_PASSWORD
    }
});

const sendEmail = (date, htmlBody) => {
    // setup email data with unicode symbols
    let mailOptions = {
        from: `"Portfolio" <${constants.EMAIL_ACCOUNT_USERNAME}>`,
        to: constants.EMAIL_TO,
        subject: "Portfolio 1st of November 2017",
        text: "Portfolio 1st of November 2017",
        html: htmlBody
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return logger.info(error);
        }
        logger.info(`Message ${info.messageId} sent to ${info.envelope.to}`);
    });
};

const generateEmailBody = (date, data) => {
    data = data || {foo: "Gigasoft: +99%"};
    return `<h1>Portfolio ${date}</h1>
    <h2>Highlights</h2>
    <h3>Price changes</h3>
    <ul>
        <li>ABC +10%</li>
        <li>DEF +5%</li>
        <li>ZZZ -23%</li>
        <li>${data.foo}</li>
    </ul>
    <h2>Details</h2>
    <h2>Currencies</h2>`;
};

module.exports.send = (date, data) => {
    date = date || "1st of November 2017";
    const htmlBody = generateEmailBody(date, data);
    sendEmail(date, htmlBody);
};