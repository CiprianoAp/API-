import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();



const MONG_OURL: string | any = process.env.URI;

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


