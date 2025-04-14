import dotenv from "dotenv";
dotenv.config();
if (process.env.DATABASE_URL === undefined ||
    process.env.SMTP_SENDER_EMAIL === undefined ||
    process.env.SMTP_EMAIL_PASSWORD === undefined ||
    process.env.QUEUE_HOST === undefined ||
    process.env.QUEUE_PORT === undefined ||
    process.env.PORT === undefined ||
    process.env.JSON_WEB_TOKEN_SECRET === undefined ||
    process.env.CLIENT_APP_URL === undefined) {
    throw new Error("Environment variables missing."); //do it
}
const env = {
    PORT: process.env.PORT,
    SMTP_SENDER_EMAIL: process.env.SMTP_SENDER_EMAIL,
    DATABASE_URL: process.env.DATABASE_URL,
    SMTP_EMAIL_PASSWORD: process.env.SMTP_EMAIL_PASSWORD,
    QUEUE_HOST: process.env.QUEUE_HOST,
    QUEUE_PORT: process.env.QUEUE_PORT,
    JSON_WEB_TOKEN_SECRET: process.env.JSON_WEB_TOKEN_SECRET,
    CLIENT_APP_URL: process.env.CLIENT_APP_URL
};
export { env };
