import { Request, Response } from "express";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as dotenv from 'dotenv';

import { ReturnErroCatch, ReturnSucesso } from "../helpers/helper";

dotenv.config()

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});

interface S3UploadResult {
    Location?: string;
    [key: string]: any;
}

interface UploadedFile {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    [key: string]: any;
}


export const uploadImageToS3 = async (fileBuffer: Buffer, bucketName: string, key: string, mimeType: string): Promise<S3UploadResult | undefined>  => {
    try {
        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: fileBuffer,
            ContentType: mimeType
        };

        const upload = new Upload({
            client: s3Client,
            params: uploadParams,
        });


        const result = await upload.done().catch((e) => {
            console.log(e)
            return e
        })

        return result;

    } catch (error) {
        throw error;
    }
};


class StorageController {


    public async salvaImagemS3(req: Request, res: Response): Promise<Response> {
        try {
            const files = req.files as UploadedFile[];


            if (!files || files.length <= 0) {
                return res.status(400).send('Nenhum arquivo foi enviado.');
            }

            if (!req.body.destino) {
                return res.status(400).send('Nenhum destino foi informado.');
            }
            const destino = req.body.destino
            let result
           const retorno: string[] = [];

            for (let index = 0; index < files.length; index++) {

                const file = files[index];

                let fileName = file.originalname;
                const formato = fileName.split(".").pop()

                if (req.body.nomeArquivo) {

                    fileName = req.body.nomeArquivo + "." + formato

                }

                const fileBuffer = file.buffer;

                const bucketName = process.env.S3_BUCKET_NAME || '';
                const mimeType = file.mimetype;

                result = await uploadImageToS3(fileBuffer, bucketName, `${destino}/${fileName}`, mimeType);

                if (result?.Location) {
                    retorno.push(result.Location);
                }

                //console.log("res", result)

            }

            return ReturnSucesso(res, retorno);


        } catch (e: unknown) {

            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")

        }
    }
}

export default new StorageController()
