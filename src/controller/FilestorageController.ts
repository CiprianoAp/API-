import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

class FilestorageController {

    fileCreat = async (req: Request, res: Response) => {

        const storage = multer.diskStorage({

            destination: function (req, file, cb) {

                // extensão
                const ext = path.extname(file.originalname).toLowerCase();

                let folder = "";

                // verificar tipo
                if (ext === ".jpg" || ext === ".jpeg") {

                    folder = "images";

                } else if (ext === ".png") {

                    folder = "png";

                } else if (ext === ".pdf") {

                    folder = "pdf";

                } else if (ext === ".docx") {

                    folder = "word";

                } else {

                    folder = "others";
                }

                // caminho final
                const uploadPath = path.resolve(
                    "src/public",
                    folder
                );

                // criar pasta se não existir
                if (!fs.existsSync(uploadPath)) {

                    fs.mkdirSync(uploadPath, {
                        recursive: true
                    });
                }

                cb(null, uploadPath);
            },

            filename: function (req, file, cb) {

                const ext = path.extname(file.originalname);

                const filename =
                    Date.now() + "-" + file.originalname;

                cb(null, filename);
            }
        });

        const upload = multer({ storage }).single("file");

        upload(req, res, function (err) {

            if (err instanceof multer.MulterError) {

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
    }
}

export default new FilestorageController();