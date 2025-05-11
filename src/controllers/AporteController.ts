import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import moment from "moment-timezone";
import AporteModel from "../models/AporteModel";

class AporteController {

    public async EntradaInvestimento (req: Request, res: Response) {
        try{

            const {  valor, dataMovimentacao, socioId, descricao, socioNome } = req.body;

            if(typeof valor == "undefined" || valor == ""){
                return ReturnErroPadrao(res, 5)
            } 

            if(typeof dataMovimentacao == "undefined" || dataMovimentacao == ""){
                return ReturnErroPadrao(res, 5)
            } 

            if(typeof socioId == "undefined" || socioId == ""){
                return ReturnErroPadrao(res, 5)
            } 

            if(typeof socioNome == "undefined" || socioNome == ""){
                return ReturnErroPadrao(res, 5)
            } 

            let valorTratado = parseFloat(valor.replace(",",".")).toFixed(2)
            
            const infos = {
                dataSalvou:moment().tz("America/Sao_Paulo").format(),
                dataMovimentacao:dataMovimentacao,
                valor:valorTratado,
                socioId:socioId,
                descricao,
                socioNome
            }
 
            const resSalvar = await AporteModel.salvar(infos)

            return ReturnSucesso(res, resSalvar)

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
        

    }
}

export default new AporteController()