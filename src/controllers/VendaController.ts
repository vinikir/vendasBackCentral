import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"

import ProdutoModel from "../models/ProdutoModel";
import KardexModel from "../models/KardexModel";
import { ExtrairProdutoIds, ValidaSaldoPositivo } from "../helpers/Funcoes";
import VendaModel from "../models/VendaModel";
import moment from "moment-timezone";

class VendaController {
   
    public async RegistrarVenda (req: Request, res: Response) {

        try{


            const { userId, tipoVenda,  produtos} = req.body

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
                userId,
                tipoVenda,
                produtos
            }

            const res_salvarVenda = await VendaModel.salvar(InfosSalvar)

            if(typeof res_salvarVenda._id == "undefined"){
                throw new Error("Erro ao salvar venda");
            }

            for (let index = 0; index < produtosBuscaPorId.length; index++) {

                let produto = produtosBuscaPorId[index];

                const produtoVendidoEncontrado = produtos.filter((el) => el.produtoId == produto._id)
                let novoSaldo:number

                if(produto.tipo == "servico"){

                    novoSaldo = produto.estoque? produto.estoque : 0   + produtoVendidoEncontrado[0].qtd

                }else{

                    novoSaldo = produto.estoque - produtoVendidoEncontrado[0].qtd

                }
                
                await ProdutoModel.atualizar(produto._id, {estoque:novoSaldo })

                let infosKardex = {
                    tipo: "venda",
                    nome: produto.nome,
                    idProduto: produto._id,
                    valor: produtoVendidoEncontrado[0].valorTotal,
                    data: moment().tz("America/Sao_Paulo").format(),
                    observasao:"",
                    qtd:produtoVendidoEncontrado[0].qtd,
                    vendaId:res_salvarVenda._id
                }

                await KardexModel.salvar(infosKardex)

            }

            return ReturnSucesso(res, "ok")

        }catch(e){

            return ReturnErroCatch(res, e.message)

        }

    }


}
export default new VendaController()