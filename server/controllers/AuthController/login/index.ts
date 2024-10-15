import { compare } from "bcrypt";
import User from "../../../models/UserModel";
import { createToken, maxAge } from "../utils/createToken";

export const login = async (request: any, response: any) => {
    try {

        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password is required.")
        }

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).send("User with the given email not found.")
        }

        const auth = await compare(password, user.password)

        if (!auth) {
            return response.status(400).send("Password is incorrect")
        }

        const token = createToken({ email: user.email, userId: user.id })

        response.cookie("jwt", token, {
            maxAge,
            secure: true,
            sameSite: "none"
        })

        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            }
        })
    }
    catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error");
    }
}