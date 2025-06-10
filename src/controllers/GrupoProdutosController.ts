import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroCatch, ReturnErro } from "../helpers/helper"
import GrupoProdutosModel from "../models/GrupoProdutosModel";

class GrupoProdutosController {

    public async buscar (req: Request, res: Response) {
        try{
            const busca = typeof req.query.busca === 'string' ? req.query.busca : '';

            

            const res_busca = await GrupoProdutosModel.busca( busca )

            return ReturnSucesso(res, res_busca)

        }catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

}

export default new GrupoProdutosController()