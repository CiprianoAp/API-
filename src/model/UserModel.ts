import mongoose, { model } from "mongoose";

const userschema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
       /* unique: true */
    }
},{ timestamps: true}

);

export const  UserModel =  mongoose.model("User",userschema);