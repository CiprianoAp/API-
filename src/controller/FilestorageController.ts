import { Request, Response } from "express";
import { FileStorageModel } from "../model/FileStorageModel";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

class FilestorageController {

    //Carregar ficheiro
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


            //Salvar dados no banco de dados

            try {
                const file = new FileStorageModel({
                    nome: req.file.filename,
                    caminho: req.file.path,
                })

                file.save();

                return res.status(200).json({
                    message: "Upload realizado",
                    file: req.file.filename,
                    path: req.file.path
                });

            } catch (erro) {
                return res.sendStatus(500);
            }

        });
    }

    //Buscar todos ficheiros
    RetornAll = async (req: Request, res: Response) => {
        try {

            const file = await FileStorageModel.find();
            const fileResponse = file.map((file: any) => {
                // converter barras do windows
                const normalizedPath =
                    file.caminho.replace(/\\/g, "/");

                // remover src/public/
                const relativePath =
                    normalizedPath.replace(
                        "src/public/",
                        ""
                    );

                return {
                    id: file.id,
                    nome: file.nome,
                    caminho: file.caminho,

                    url: `${process.env.URL}${relativePath}`
                }
            });

            return res.status(200).json(fileResponse)

        } catch (erro) {
            return res.status(500).json({
                message: "Erro ao buscar arquivos", error: erro
            });
        }
    }

    //BUscar pelo id
    docId = async (req: Request, res: Response) => {

        try {

            const file = await FileStorageModel.findById(req.params.id);

            if (!file) {
                return res.status(404).json({
                    message: "Ficheiro não encontrado"
                });
            }

            const normalized = (file.caminho ?? "").replace(/\\/g, "/");

            const relativePath = normalized.includes("src/public/")
                ? normalized.split("src/public/")[1]
                : normalized;

            return res.json({
                id: file._id,
                nome: file.nome,
                caminho: file.caminho,

                url: `${process.env.URL}${file.caminho}`
            });

        } catch (error) {

            return res.status(500).json({
                message: "Erro ao buscar ficheiro",
                error: String(error)
            });
        }
    }
}

export default new FilestorageController();