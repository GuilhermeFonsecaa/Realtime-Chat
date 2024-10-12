import mongoose from "mongoose"
import { genSalt, hash } from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email é necessário"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Senha é necessária"]
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false,
    },
    imnage: {
        type: String,
        required: false
    },
    color: {
        type: Number,
        required: false
    },
    profileSetup: {
        type: Boolean,
        default: false
    },
});

// função que será executada antes de o documento ser salvo no banco de dados
userSchema.pre("save", async function (next) {
    const salt = await genSalt(); //valor aleatório para tornar a senha mais segura
    this.password = await hash(this.password, salt); //criptografia da senha
    next();
})

const User = mongoose.model("Users", userSchema);

export default User;