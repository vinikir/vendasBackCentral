import { S3Client, S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as dotenv from 'dotenv';
import * as path from 'path';
import fs from 'fs';
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});

export const uploadImageToS3 = async (fileBuffer: Buffer, bucketName: string, key: string, mimeType: string) => {
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
        })
       
        return result;
        
    } catch (error) {
        throw error;
    }
};

dotenv.config()

class StorageController {


    public async salvaImagemS3(req: Request, res: Response) {
        try {


            if (!req.files || req.files.length <= 0) {
                return res.status(400).send('Nenhum arquivo foi enviado.');
            }
            
            if(!req.body.destino){
                return res.status(400).send('Nenhum destino foi informado.');
            }
            const destino = req.body.destino
            let result
            let retorno = []

            for (let index = 0; index < req.files.length; index++) {

                const file = req.files[index];

                let fileName = file.originalname;
                const formato = fileName.split(".").pop()

                if(req.body.nomeArquivo){

                    fileName = req.body.nomeArquivo+"."+formato

                }
               
                const fileBuffer = file.buffer;
               
                const bucketName = process.env.S3_BUCKET_NAME;
                const mimeType = file.mimetype; 
                
                result = await uploadImageToS3(fileBuffer, bucketName, `${destino}/${fileName}`, mimeType);
                
                if(result.Location){
                    
                    retorno.push(result.Location)

                }

                //console.log("res", result)

            }


            return res.status(200).send(retorno);




        
        } catch (err) {
            console.error("Erro no upload para o S3:", err);
            throw err;  // Relançar o erro para tratar adequadamente
        }
    }
}

export default new StorageController()
