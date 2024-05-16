
const nodemailer=require("nodemailer")
const emailTemp = require('./tempEmail');

async function sendOurEmail(option) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "gehadmarawan1@gmail.com",
            pass: "zvfy skmj oyzt wxko",
        },
    });

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <gehadmarawan1@gmail.com>', // sender address
        to: option.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: emailTemp(option.url), // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = sendOurEmail;
