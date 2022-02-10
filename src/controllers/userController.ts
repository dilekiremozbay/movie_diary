import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
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

    return response.redirect("/?from=register");
  }

  async login(req: Request, res: Response) {
    res.render("login", {
      error: "",
      values: {},
    });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("token");

    return res.redirect("/");
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
      const token = jwt.sign({ sub: user.id }, JWT_SECRET);

      response.cookie("token", token, {
        signed: true,
        httpOnly: true,
      });

      return response.json({
        success: true,
        token,
      });
    }

    return response.json({
      success: false,
      error: "Invalid username or password",
    });
  }

  async me(req: Request, res: Response) {
    const user = req.user;

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }
}
