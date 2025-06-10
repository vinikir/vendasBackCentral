import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"

import ProdutoModel from "../models/ProdutoModel";
import KardexModel from "../models/KardexModel";
import { ExtrairProdutoIds, ValidaSaldoPositivo } from "../helpers/Funcoes";
import OrcamentoModel from "../models/OrcamentoModel";
import moment from "moment-timezone";

class OrcamentoController {
    
    public async salvar (req: Request, res: Response) {

        try{


            const { userId, tipoVenda,  produtos, user} = req.body

            const produtosIds = ExtrairProdutoIds(produtos)

            const buscaProdutoQury = {
                _id:{ "$in" :produtosIds}
            }

            const produtosBuscaPorId = await ProdutoModel.buscar(buscaProdutoQury)

            const res_ValidaSaldoPositivo = ValidaSaldoPositivo( produtos, produtosBuscaPorId )

            if(res_ValidaSaldoPositivo.valido == false){

                return ReturnErro(res, res_ValidaSaldoPositivo.tipo, 400 )

            }

            const InfosSalvar = {
                user,
                userId,
                tipoVenda,
                produtos,
                status:"aberto",
                data: moment().tz("America/Sao_Paulo").format(),
                orcamentoId:0
            }

            const res_salvarOrcametno = await OrcamentoModel.salvar(InfosSalvar)

            if(typeof res_salvarOrcametno._id == "undefined"){
                throw new Error("Erro ao salvar orçamento");
            }

            return ReturnSucesso(res, res_salvarOrcametno)

        }catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }

    }

    public async buscar (req: Request, res: Response) {
        try{

            const res_busca = await OrcamentoModel.getAll() 

            return ReturnSucesso(res, res_busca)

        }catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }
}
export default new OrcamentoController()