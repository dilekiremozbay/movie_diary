import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";

const jwtSecret = process.env.JWT_SECRET;

declare module "express" {
  interface Request {
    user?: User;
  }
}

export async function validateJWTMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = verify(token, jwtSecret);
    const user = await User.findOne(decoded.sub as string);

    req.user = user;

    next();
  } catch (err) {
    return res.redirect("/login");
  }
}
