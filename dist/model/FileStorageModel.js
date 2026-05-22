"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ShemaFile = new mongoose_1.default.Schema({
    nome: {
        type: String,
    },
    caminho: {
        type: String,
    }
}, { timestamps: true });
exports.FileStorageModel = mongoose_1.default.model("File", ShemaFile);
//# sourceMappingURL=FileStorageModel.js.map