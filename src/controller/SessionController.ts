import jwt from "jsonwebtoken";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import { UserModel } from "../model/UserModel";
import authConfig from "../config/auth";
import { Request, Response } from "express";

class SessionController {
  async session(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string()
      .required("Email campo obrigatório")
      .email("Email inválido"),
      password: Yup.string().required("Senha campo obrigatório")
    });

    try {

      await schema.validate(req.body, {
        abortEarly: true,
      });

    } catch (error: any) {

      return res.status(400).json({
        erros: error.errors,
      });

    }
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });


    if (!user) {
      return res.status(401).json({ error: "Usuário não existe" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ error: "Emain ou senha incorreta" });
    }

    return res.json({
      user
      ,
      token: jwt.sign(
        { id: user._id },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
  }
}

export default new SessionController();