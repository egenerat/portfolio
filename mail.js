const constants = require("./constants/constants.js");
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: constants.EMAIL_ACCOUNT_USERNAME,
        pass: constants.EMAIL_ACCOUNT_PASSWORD
    }
});


const sendEmail = (htmlBody) => {
    // setup email data with unicode symbols
    let mailOptions = {
        from: `"Portfolio" <${constants.EMAIL_ACCOUNT_USERNAME}>`,
        to: constants.EMAIL_TO,
        subject: "Hello",
        text: "Hello world",
        html: htmlBody
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
};

const main = () => {
    let htmlBody = `<h1>Portfolio 1st of November 2017</h1>
    <h2>Highlights</h2>
    <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
    </ul>
    <h2>Details</h2>
    <h2>Currencies</h2>`;
    sendEmail(htmlBody);
};

main();
module.exports.sendEmail = sendEmail;