import express, { Request, Response } from "express";
import mongoose from "mongoose";

const MONG_OURL = "mongodb://127.0.0.1:27017";



class BD {

    conn = async () => {

        try {

            await mongoose.connect(MONG_OURL, {
                dbName: "cadastrarElogUsuario"
            });

            console.log("Base de dados conectada");

        } catch (error) {

            console.log("Erro ao conectar:", error);

        }

    }

}

export default new BD();


