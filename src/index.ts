import Express  from "express";
import router from "./routers";
import Con from './db/conectar'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const app = Express();
app.use(Express.json());


Con.conn();
app.use("/", router);


app.listen(PORT, ()=>{
    console.log(`App, está a rodar na porta ${PORT}`);
})
