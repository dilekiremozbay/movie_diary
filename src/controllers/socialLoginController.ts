import { Request, Response } from "express";
import passport from "passport";

export class SocialLoginController {
  authFailure(req: Request, res: Response) {
    res.send("Failed to login with a social account.");
  }

  authWithFacebookMiddleware = passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  });

  authWithFacebookCallbackMiddleware = passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/auth-failure",
  });

  registerFacebookUser(req: Request, res: Response) {}
}
