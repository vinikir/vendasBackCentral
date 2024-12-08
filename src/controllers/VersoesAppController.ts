import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import { uploadImageToS3 } from "./StorageController"
import VersoesAppModel from "../models/VersoesAppModel";
import moment from "moment-timezone";
class VersoesAppController {

    public async upLoadNovaVersao(req: Request, res: Response): Promise<Response> {
        try{

            if(typeof req.files == "undefined" || typeof req.files[0] == "undefined"){
                return ReturnErroPadrao(res, 14)
            }   
            const file = req.files[0];
          
            let fileName = file.originalname;
            const formato = fileName.split(".").pop()

            let body = req.body
            
            
            const fileBuffer = file.buffer;
            
            const bucketName = "atualizacao-testels";
            const mimeType = file.mimetype; 
            
            let res_buscaUltimoId = await VersoesAppModel.buscaUltimoId()
            let id:number
            if(res_buscaUltimoId == null){
                id = 1
            }else{
                id = res_buscaUltimoId.id
                id = id+1
            }

            let destino = ""

            
            destino = "versoes/"+id
            console.log(res_buscaUltimoId)
            
            
            const result = await uploadImageToS3(fileBuffer, bucketName, `${destino}/${fileName}`, mimeType);

            if(typeof result.Location == "undefined"){
                return ReturnErro(res, JSON.stringify(result), 998)
            }

            let infos = {
                ativo:true,
                id:id,
                latestVersion: body.latestVersion,
                releaseNotes:body.releaseNotes,
                mandatory:body.mandatory,
                bundleUrl:result.Location,
                releaseDate:moment().tz("America/Sao_Paulo").format(),
                tester:body.tester
            }
           
            const res_salvar = await VersoesAppModel.salvar(infos)
            
            return ReturnSucesso(res, res_salvar)
           
            
        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }

    public async verificaUpdate (req: Request, res: Response): Promise<Response>{
        try{

            const res_salvar = await VersoesAppModel.salvar(infos)

            return ReturnSucesso(res, res_salvar)
        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }
}

export default new VersoesAppController;