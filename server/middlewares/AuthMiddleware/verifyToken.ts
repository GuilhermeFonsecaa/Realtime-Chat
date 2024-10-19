import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (request: Request, response: Response, next: NextFunction): void => {
    const token = request.cookies.jwt;
    const jwtKey = process.env.JWT_KEY;
    if (!token) {
        response.status(401).send("Você não está autenticado");
        return;
    }

    if (!jwtKey) {
        response.status(500).send("Erro no servidor: Chave JWT não definida");
        return;
    }

    //verificar -> token, chave, (erro, )
    jwt.verify(token, jwtKey, (err: any, payload: any) => {
        if (err) {
            response.status(403).send("O token não é válido");
            return;
        }
        if (payload) {
            request.userId = payload.userId;  //atribui o userId do payload à propriedade userId do objeto request. Isso permite usar o userId em middleware
        }
        next();
    });
}
