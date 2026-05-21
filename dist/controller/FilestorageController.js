"use strict";
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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FilestorageController {
    constructor() {
        this.fileCreat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const storage = multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    // extensão
                    const ext = path_1.default.extname(file.originalname).toLowerCase();
                    let folder = "";
                    // verificar tipo
                    if (ext === ".jpg" || ext === ".jpeg") {
                        folder = "images";
                    }
                    else if (ext === ".png") {
                        folder = "png";
                    }
                    else if (ext === ".pdf") {
                        folder = "pdf";
                    }
                    else if (ext === ".docx") {
                        folder = "word";
                    }
                    else {
                        folder = "others";
                    }
                    // caminho final
                    const uploadPath = path_1.default.resolve("src/public", folder);
                    // criar pasta se não existir
                    if (!fs_1.default.existsSync(uploadPath)) {
                        fs_1.default.mkdirSync(uploadPath, {
                            recursive: true
                        });
                    }
                    cb(null, uploadPath);
                },
                filename: function (req, file, cb) {
                    const ext = path_1.default.extname(file.originalname);
                    const filename = Date.now() + "-" + file.originalname;
                    cb(null, filename);
                }
            });
            const upload = (0, multer_1.default)({ storage }).single("file");
            upload(req, res, function (err) {
                if (err instanceof multer_1.default.MulterError) {
                    return res.status(500).json({
                        error: err.message
                    });
                }
                if (err) {
                    return res.status(500).json({
                        error: "Erro ao enviar arquivo"
                    });
                }
                if (!req.file) {
                    return res.status(400).json({
                        message: "Nenhum arquivo enviado"
                    });
                }
                return res.status(200).json({
                    message: "Upload realizado",
                    file: req.file.filename,
                    path: req.file.path
                });
            });
        });
    }
}
exports.default = new FilestorageController();
//# sourceMappingURL=FilestorageController.js.map