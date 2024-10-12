import mongoose from "mongoose";

const connectDatabase = async (databaseURL: string) => {
    try {
        await mongoose.connect(databaseURL);
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
};

export default connectDatabase;
