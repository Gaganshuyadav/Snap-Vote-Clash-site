import express from "express";
const app = express();
import { env } from "./config/env.config.js";
import path from "path";
import { fileURLToPath } from "url";
// import { sendEmailWithQueue } from "./jobs/EmailJobs.js";
import router from "./routes/index.js";
import { errorHandlingMiddleware } from "./middleware/errorHandlingMiddleware.js";
import { appLimiter } from "./config/rateLimit.js";
import cors from "cors";
//cors
app.use(cors({ origin: true }));
app.use(express.json());
//for html forms
app.use(express.urlencoded({ extended: true }));
//rate limiter
app.use(appLimiter);
//-------------------ejs---------------------------------------
//to get the directory path
const _dirname = path.dirname(fileURLToPath(import.meta.url));
//* set view engine for ejs
app.set("view engine", "ejs");
app.set("views", path.resolve(_dirname, "./views"));
app.get("/", async (req, res) => {
    // const html = await ejs.renderFile(_dirname+"/views/welcome.ejs",{ name:"Gaganshu Yadav", profession:"Developer"});
    // sendEmailWithQueue({ to: "nigoga7349@flektel.com", subject:"This email is for you", body:html});
    // res.render("welcome",{ name:"Gaganshu Yadav", profession:"Developer"});
    res.json({
        success: true,
        message: "hello from server 😒, email send successfully!🚲🚲",
    });
});
//routes
app.use("/", router);
//to catch unmatched route
app.use((req, res, next) => {
    res.render(_dirname + "/views/not-found.ejs", { requestMethod: req.method });
});
//error handler
app.use(errorHandlingMiddleware);
const PORT = env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(process.env.PORT);
});
