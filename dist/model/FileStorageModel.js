"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const yup_1 = require("yup");
const ShemaFile = new mongoose_1.default.Schema({
    file: {
        nome: String,
        caminho: yup_1.string,
        tamanho: yup_1.string,
        tipo: yup_1.string
    }
}, { timestamps: true });
exports.FileStorageModel = mongoose_1.default.model("File", ShemaFile);
//# sourceMappingURL=FileStorageModel.js.map