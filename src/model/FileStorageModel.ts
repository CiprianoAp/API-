import mongoose, { model } from 'mongoose';
import { string } from 'yup';

const ShemaFile = new mongoose.Schema({
    file:{
        nome: String,
        caminho: string,
        tamanho: string,
        tipo: string
    }
},{timestamps: true})

export const FileStorageModel = mongoose.model("File", ShemaFile);