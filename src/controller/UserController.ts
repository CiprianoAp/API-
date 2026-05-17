import Express, { request } from "express";
import { UserModel } from '../model/UserModel'
import bcrypt from "bcryptjs";

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
            const { nome, email, password } = request.body;

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