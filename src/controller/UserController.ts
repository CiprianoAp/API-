import Express, { request } from "express";
import * as Yup from 'yup';
import mongoose from 'mongoose';
import { UserModel } from '../model/UserModel'
import bcrypt from "bcryptjs";



const schema = Yup.object().shape({
    nome: Yup.string()
        .required("Nome é obrigatório")
        .min(3, "Nome muito curto"),

    email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),

    password: Yup.string()
        .required("Senha é obrigatória")
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .matches(/[A-Z]/, "Senha: Deve ter uma letra maiúscula")
        .matches(/[a-z]/, "Senha: Deve ter uma letra minúscula")
        .matches(/[0-9]/, "Senha: Deve ter um número")
        .matches(/[@$!%*?&]/, "Deve ter um caractere especial"),
});


class UserController {

    //Todos user
    getAllUser = async (resques: Express.Request, response: Express.Response) => {
        try {

            const User = await UserModel.find();

            return response.status(200).json({ data: User })

        } catch (error) {
            return response.sendStatus(400).json({ data: error })
        }
    }

    //Buscar pelo ID
    getFind = async (request: Express.Request, response: Express.Response) => {
        try {

            const { id } = request.params;
            const User = await UserModel.findById(id);

            return response.status(200).json({ data: User })

        } catch (error) {
            return response.sendStatus(400).json({ data: error })
        }
    }

    //Criar usuário
    createUser = async (request: Express.Request, response: Express.Response) => {

        try {
            // validação
            await schema.validate(request.body, {
                abortEarly: true,
            });

        } catch (error: any) {
            return response.status(400).json({
                erros: error.errors,
            });
        }

        try {


            const { nome, email, password } = request.body;

            const confemail = await UserModel.findOne({ email });

            if (confemail) {
                return response.status(400).json({ error: "O email já existe" });
            }

            // hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new UserModel({
                nome,
                email,
                password: hashedPassword,
            });

            await user.save();

            return response.status(201).json({
                mensagem: "Usuário criado com sucesso",
                data: user,
            });

        } catch (error) {
            return response.sendStatus(500);
        }
    }

    //Atualizar usuario
    UpdateUser = async (request: Express.Request, response: Express.Response) => {
        try {
            const { id } = request.params;
            const { nome, email, password } = request.body;
            const User = await UserModel.findById(id);
            if (User) {
                User.nome = nome,
                    User.email = email,
                    User.password = password

                await User.save();
                return response.status(200).json({ message: "Usuário atualizado com sucesso", dados: User })

            }
            return response.sendStatus(400)
        } catch (error) {
            return response.sendStatus(400)
        }
    }

    deleteUser = async (request: Express.Request, response: Express.Response) => {
        try {
            const { id } = request.params;
            await UserModel.findByIdAndDelete(id);
            return response.status(200).json({ message: "Usuário eliminado com sucesso" })
        } catch (error) {
            return response.sendStatus(400);
        }
    }

}

export default new UserController();