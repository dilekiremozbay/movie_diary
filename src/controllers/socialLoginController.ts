import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export class SocialLoginController {
  authFailure(req: Request, res: Response) {
    res.send("Failed to login with a social account.");
  }

  authWithFacebookMiddleware = passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  });

  authWithFacebookCallbackMiddleware = passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/set-cookie",
    failureRedirect: "/auth-failure",
  });

  setSocialLoginUserCookie(req: Request, res: Response) {
    const token = jwt.sign({ sub: req.user.id }, JWT_SECRET);

    res.cookie("token", token, {
      signed: true,
      httpOnly: true,
    });

    res.redirect("/");
  }
}
