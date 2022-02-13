import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { registerRoutes } from "./routes";
import multer from "multer";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import session from "express-session";
import { SocialLoginCredentials } from "./entity/SocialLoginCredentials";
import { User } from "./entity/User";

//---------Init Express App--------
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//---------Middlewares--------------
app.use(express.static("public"));
app.use("/public", express.static("public"));

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(cookieParser("cookie-parser-secret"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "session-secret",
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("register facebook user:", {
        accessToken,
        refreshToken,
        profile,
      });

      let creds = await SocialLoginCredentials.findOne({
        where: {
          provider: "https://facebook.com",
          subject: profile.id,
        },
      });

      if (creds) {
        return done(null, creds.user);
      }

      let user = await User.findOne({
        where: {
          email: profile.emails[0].value,
        },
      });

      if (user) {
        return done(new Error("e-mail is already registered."));
      }

      // create a new user
      user = new User();

      user.email = profile.emails[0].value;
      user.username = await User.makeUsernameUnique(profile.username);

      await user.save();

      // save social credentials
      creds = new SocialLoginCredentials();

      creds.user = user;
      creds.accessToken = accessToken;
      creds.refreshToken = refreshToken;
      creds.provider = "https://facebook.com";

      await creds.save();

      done(null, user);
    }
  )
);
// / passport

registerRoutes(app);

createConnection()
  .then(() => {
    const port = 3000;

    app.listen(port, () => {
      console.log(`Sunucu ${port} portunda başlatıldı`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/404", (req: Request, res: Response) => {
  res.render("404");
});
