import mongoose, { model } from 'mongoose';

const ShemaFile = new mongoose.Schema({
    
    nome: {
        type: String,
    },

    caminho: {
        type: String,
    }

}, { timestamps: true })

export const FileStorageModel = mongoose.model("File", ShemaFile);