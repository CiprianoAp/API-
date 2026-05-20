"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const UserModel_1 = require("../model/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
    constructor() {
        //Todos user
        this.getAllUser = (resques, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield UserModel_1.UserModel.find();
                return response.status(200).json({ data: User });
            }
            catch (error) {
                return response.sendStatus(400).json({ data: error });
            }
        });
        //Buscar pelo ID
        this.getFind = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const User = yield UserModel_1.UserModel.findById(id);
                return response.status(200).json({ data: User });
            }
            catch (error) {
                return response.sendStatus(400).json({ data: error });
            }
        });
        //Criar usuário
        this.createUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                // validação
                yield schema.validate(request.body, {
                    abortEarly: true,
                });
            }
            catch (error) {
                return response.status(400).json({
                    erros: error.errors,
                });
            }
            try {
                const { nome, email, password } = request.body;
                const confemail = yield UserModel_1.UserModel.findOne({ email });
                if (confemail) {
                    return response.status(400).json({ error: "O email já existe" });
                }
                // hash da senha
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const user = new UserModel_1.UserModel({
                    nome,
                    email,
                    password: hashedPassword,
                });
                yield user.save();
                return response.status(201).json({
                    mensagem: "Usuário criado com sucesso",
                    data: user,
                });
            }
            catch (error) {
                return response.sendStatus(500);
            }
        });
        //Atualizar usuario
        this.UpdateUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { nome, email, password } = request.body;
                const User = yield UserModel_1.UserModel.findById(id);
                if (User) {
                    User.nome = nome,
                        User.email = email,
                        User.password = password;
                    yield User.save();
                    return response.status(200).json({ message: "Usuário atualizado com sucesso", dados: User });
                }
                return response.sendStatus(400);
            }
            catch (error) {
                return response.sendStatus(400);
            }
        });
        this.deleteUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                yield UserModel_1.UserModel.findByIdAndDelete(id);
                return response.status(200).json({ message: "Usuário eliminado com sucesso" });
            }
            catch (error) {
                return response.sendStatus(400);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map