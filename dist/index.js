"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const conectar_1 = __importDefault(require("./api/conectar"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
conectar_1.default.conn();
app.use("/", routers_1.default);
app.listen(PORT, () => {
    console.log(`App, está a rodar na porta ${PORT}`);
});
//# sourceMappingURL=index.js.map