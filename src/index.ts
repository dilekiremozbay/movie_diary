import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { registerRoutes } from "./routes";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import session from "express-session";
import { SocialLoginCredentials } from "./entity/SocialLoginCredentials";
import { User } from "./entity/User";
import axios, { AxiosResponse } from "axios";
import emailAddresses from "email-addresses";

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
          provider: profile.provider,
          subject: profile.id,
        },
      });

      if (creds) {
        return done(null, creds.user);
      }

      // get profile from facebook
      const fbProfileResp: AxiosResponse<{
        id: number;
        email: string;
      }> = await axios(
        `https://graph.facebook.com/v13.0/me?fields=id%2Cemail&access_token=${accessToken}`
      );

      // check if the email address is already in use
      let user = await User.findOne({
        where: {
          email: fbProfileResp.data.email,
        },
      });

      if (user) {
        return done(new Error("e-mail is already registered."));
      }

      // create a new user
      const emailAddress = emailAddresses.parseOneAddress(
        fbProfileResp.data.email
      );
      const initialUsername = (emailAddress as any).local;

      user = new User();

      user.email = fbProfileResp.data.email;
      user.username = await User.makeUsernameUnique(initialUsername);

      await user.save();

      // save social credentials
      creds = new SocialLoginCredentials();

      creds.subject = profile.id;
      creds.user = user;
      creds.accessToken = accessToken;
      creds.refreshToken = refreshToken || "";
      creds.provider = profile.provider;

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
