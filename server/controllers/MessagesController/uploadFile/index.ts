import { Request, Response } from "express";
import { mkdirSync, renameSync } from "fs";

export const uploadFile = async (request: Request, response: Response) => {
    try {
        if (!request.file) {
            response.status(400).send("Arquivo é obrigatório");
        }

        if (!request.file?.path) {
             response.status(400).send("Caminho do arquivo não encontrado");
        }

        const date = Date.now();
        let fileDir = `uploads/files/${date}`
        let fileName = `${fileDir}/${request.file?.originalname}`;

        // Cria o diretório especificado por fileDir
        mkdirSync(fileDir, { recursive: true });

        if (request.file) {
            if (!request.file.path) {
                response.status(400).send("Caminho do arquivo não encontrado");
            }

            // Move o arquivo para o diretório de destino
            renameSync(request.file.path, fileName);

            response.status(200).json({ filePath: fileName });
        }
    }
    catch (error) {
        response.status(500).send("Internal Server Error")
    }
}