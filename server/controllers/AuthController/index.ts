import User from "../../models/UserModel";
import {Request, Response } from "express";
import { createToken, maxAge } from "./utils/createToken";


export const signup = async ({request, response}: any) => {
    try {

        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email and Password is required")
        }

        const user = await User.create({ email, password });
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
                profileSetup: user.profileSetup
            }
        })
    }
    catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error");
    }
}