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
        .max(40, "senha deve ter no minimo 40 caracteres")
        .min(6, "Senha deve conter no minimo 6 carateres")
        .matches(/[A-Z]/, "Senha: deve conter letra maiúsculas de A-Z")
        .matches(/[a-z]/, "Senha: deve deve conter letras minusculas de a-z")
        .matches(/[0-9]/, "Senha: deve conter pelo menos um número")
        .matches(
          /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/]/,
          "Senha: deve conter pelo menos um caractere especial"
        ),
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
      return res.status(401).json({ error: "Senha incorreta" });
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