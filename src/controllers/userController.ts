import * as bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

const JWT_SECRET = process.env.JWT_SECRET;

export class UserController {
  async register(req: Request, res: Response) {
    res.render("register", {
      error: "",
      values: {},
    });
  }

  async registerPOST(request: Request, response: Response) {
    const body = request.body;
    const requiredFields = ["username", "email", "password"];

    console.log("Register form received:", body);

    for (const field of requiredFields) {
      if (!(field in body) || !body[field]) {
        return response.status(400).render("register", {
          error: `${field} is required`,
          values: body,
        });
      }
    }

    const user = User.create<User>(body) as unknown as User;

    user.password = bcrypt.hashSync(user.password, 10);

    await user.save();

    return response.redirect("/login?from=register");
  }

  async login(req: Request, res: Response) {
    res.render("login", {
      error: "",
      values: {},
    });
  }

  async loginPOST(request: Request, response: Response) {
    const body = request.body;
    const requiredFields = ["username", "password"];

    console.log("Login form received:", body);

    for (const field of requiredFields) {
      if (!(field in body) || !body[field]) {
        return response.json({
          success: false,
          error: `${field} is required`,
        });
      }
    }

    const user = await User.findOne({
      where: { username: body.username },
    });

    if (user && bcrypt.compareSync(body.password, user.password)) {
      return response.json({
        success: true,
        token: jwt.sign({ sub: user.id }, JWT_SECRET),
      });
    }

    return response.json({
      success: false,
      error: "Invalid username or password",
    });
  }

  async all(request: Request, response: Response) {
    return User.find();
  }

  async one(request: Request, response: Response) {
    return User.findOne(request.params.id);
  }

  async save(request: Request, response: Response) {
    return User.save(request.body);
  }

  async remove(request: Request, response: Response) {
    let userToRemove = await User.findOne(request.params.id);
    await User.remove(userToRemove);
  }
}
