import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroCatch } from "../helpers/helper"
import GrupoProdutosModel from "../models/GrupoProdutosModel";

class GrupoProdutosController {

    public async buscar (req: Request, res: Response) {
        try{
            const {busca} = req.query
            
            const res_busca = await GrupoProdutosModel.busca( busca )

            return ReturnSucesso(res, res_busca)

        }catch(e){
        
            return ReturnErroCatch(res, e.message)

        }
    }

}

export default new GrupoProdutosController()