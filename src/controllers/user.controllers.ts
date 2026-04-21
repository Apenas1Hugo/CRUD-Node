import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  create(req: Request, res: Response) {
    try {
      const user = userService.createUser(req.body);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
