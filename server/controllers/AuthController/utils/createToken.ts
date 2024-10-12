import jwt from "jsonwebtoken"

interface createTokenProps {
    email: string;
    userId: number;
}

export const maxAge = 3 * 24 * 60 * 60 * 1000;

export const createToken = ({ email, userId }: createTokenProps) => {
    const jwtKey = process.env.JWT_KEY;

    if (!jwtKey) {
        throw new Error("JWT_KEY is not defined");
    }

    return jwt.sign({ email, userId }, jwtKey, { expiresIn: maxAge })
}
