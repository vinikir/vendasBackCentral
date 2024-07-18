import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import InvestimentoModel from "../models/InvestimentoModel";
import moment  from "moment-timezone";

class FinanceiroController {

    public async EntradaInvestimento (req: Request, res: Response) {
        try{

            const {  valor, dataMovimentacao, socio } = req.body;

            if(typeof valor == "undefined" || valor == ""){
                return ReturnErroPadrao(res, 5)
            } 

            if(typeof dataMovimentacao == "undefined" || dataMovimentacao == ""){
                return ReturnErroPadrao(res, 5)
            } 

            const infos = {
                tipo:"entrada",
                dataSalvou:moment().tz("America/Sao_Paulo").format(),
                dataMovimentacao:dataMovimentacao,
                valor:valor,
                socio:socio
            }
 
            const resSalvar = await InvestimentoModel.salvar(infos)

            return ReturnSucesso(res, resSalvar)

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
        

    }

    public async SaidaInvestimentoMercadoria(req: Request, res: Response) {
        try{

            const {  valor, dataMovimentacao } = req.body;

            if(typeof valor == "undefined" || valor == ""){
                return ReturnErroPadrao(res, 5)
            } 

            if(typeof dataMovimentacao == "undefined" || dataMovimentacao == ""){
                return ReturnErroPadrao(res, 5)
            } 

            const infos = {
                tipo:"compra mercadoria",
                dataSalvou:moment().tz("America/Sao_Paulo").format(),
                dataMovimentacao:dataMovimentacao,
                valor:valor
            }
    
            const resSalvar = await InvestimentoModel.salvar(infos)

            return ReturnSucesso(res, resSalvar)

        }catch(e){
            return  ReturnErroCatch(res, e.message)
        }
        

    }

}

export default new FinanceiroController()