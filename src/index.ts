import Express  from "express";
import router from "./routers";
import Con from './api/conectar'
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const app = Express();
app.use(Express.json());


Con.conn();
app.use("/", router);

app.use(
    "/files",
    Express.static(
        path.resolve("src/public")
    )
);


app.listen(PORT, ()=>{
    console.log(`App, está a rodar na porta ${PORT}`);
})
