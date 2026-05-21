"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const SessionController_1 = __importDefault(require("../controller/SessionController"));
const FilestorageController_1 = __importDefault(require("../controller/FilestorageController"));
const router = express_1.default.Router();
//Todos users
router.get('/usuario', UserController_1.default.getAllUser);
//User específico
router.get('/usuario/:id', UserController_1.default.getFind);
//Criar user
router.post('/criar-usuario', UserController_1.default.createUser);
//Atualizar User
router.put('/atualizar-usuario/:id', UserController_1.default.UpdateUser);
//Eliminar User
router.delete('/eliminar-usuario/:id', UserController_1.default.deleteUser);
//Upload file 
router.post('/upload', FilestorageController_1.default.fileCreat);
//Login
router.post('/login', SessionController_1.default.session);
//Exportar rota
exports.default = router;
//# sourceMappingURL=index.js.map