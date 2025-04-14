import { createTransport } from "nodemailer";
import { env } from "./env.config.js";
const transport = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: env.SMTP_SENDER_EMAIL,
        pass: env.SMTP_EMAIL_PASSWORD,
    },
    secure: false,
});
const sendMail = async ({ to, subject, body }) => {
    if (to.trim() === "" || subject.trim() === "" || body.trim() === "") {
        return;
    }
    try {
        await transport.sendMail({
            from: env.SMTP_EMAIL_PASSWORD,
            to,
            subject,
            text: "dssfsdfsdf",
            html: body,
        });
    }
    catch (err) {
        console.log(err);
    }
};
export { sendMail };
