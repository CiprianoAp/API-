import  Express  from "express";
import UserController from "../controller/UserController";
import SessionController from "../controller/SessionController";
import FilestorageController from "../controller/FilestorageController";

const router = Express.Router();

//Todos users
router.get('/usuario', UserController.getAllUser);
//User específico
router.get('/usuario/:id', UserController.getFind);
//Criar user
router.post('/criar-usuario', UserController.createUser);
//Atualizar User
router.put('/atualizar-usuario/:id', UserController.UpdateUser);
//Eliminar User
router.delete('/eliminar-usuario/:id', UserController.deleteUser);

//Upload fille 
router.post('/upload', FilestorageController.fileCreat);

//Retornar todos fille
router.get('/file', FilestorageController.RetornAll);

//Pegar file por id
router.get('/file/:id', FilestorageController.docId);

//Login
router.post('/login', SessionController.session);

//Exportar rota
export default router;