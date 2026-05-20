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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Yup = __importStar(require("yup"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = require("../model/UserModel");
const auth_1 = __importDefault(require("../config/auth"));
class SessionController {
    session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    .matches(/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/]/, "Senha: deve conter pelo menos um caractere especial"),
            });
            try {
                yield schema.validate(req.body, {
                    abortEarly: true,
                });
            }
            catch (error) {
                return res.status(400).json({
                    erros: error.errors,
                });
            }
            const { email, password } = req.body;
            const user = yield UserModel_1.UserModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "Usuário não existe" });
            }
            const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!checkPassword) {
                return res.status(401).json({ error: "Senha incorreta" });
            }
            return res.json({
                user,
                token: jsonwebtoken_1.default.sign({ id: user._id }, auth_1.default.secret, {
                    expiresIn: auth_1.default.expiresIn,
                }),
            });
        });
    }
}
exports.default = new SessionController();
//# sourceMappingURL=SessionController.js.map