import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import ProdutoModel from "../models/ProdutoModel";
import KardexModel from "../models/KardexModel";
import moment from "moment-timezone";
class ProdutoControlle{

    private calculavalorVenda (custo, margem){
        const margemEmReais = custo * (margem / 100);

        // Calcula o valor de venda
        const valorVenda = custo + margemEmReais;
      
        return parseFloat(valorVenda.toFixed(2));
    }

    public async salvar(req: Request, res: Response):  Promise<object>{
        try{

        
            const {  
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                tipo,
                quantidade,
                marca,
                sku,
                codigoBarra,
                aplicacao,
                observacao
            } = req.body; 

            let infos = {
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                estoque:quantidade,
                servico:false,
                tipo:tipo,
                marca,
                sku,
                codigoBarra,
                aplicacao,
                observacao
            }

            if(typeof margem == "undefined" && tipo == "venda"){
                infos.margem = 20
            }

            if( margem < 10 && tipo == "venda"){
                return ReturnErroPadrao(res, 3 )
            }


            if(typeof tipo == "undefined" || ( tipo != "insumo"  && tipo != "venda"  && tipo != "servico" ) ){
                return ReturnErroPadrao(res, 8 )
            }

            if(typeof ativo == "undefined"){
                infos.ativo = true
            }

            if( ( typeof quantidade == "undefined" || quantidade == "" ) && tipo != "servico" ){
                return ReturnErroPadrao(res, 3 )
            } 

            if(( typeof quantidade == "undefined" || quantidade == "" ) && tipo == "servico"){
                infos.quantidade = 0
            }
            
            if(tipo == "venda" ){

                infos.valorVenda = this.calculavalorVenda(valorCompra,infos.margem )

            }else{

                infos.valorVenda = valorCompra

            }
            

            const res_produto = await ProdutoModel.salvar(infos)
            
            if(tipo != "servico" ){

                const infosKardex = {
                    tipo: "entrada",
                    nome: nome,
                    idProduto: res_produto._id,
                    valor: infos.valorVenda,
                    data: moment().tz("America/Sao_Paulo").format(),
                    qtd:quantidade
                }
    
                await KardexModel.salvar(infosKardex)

            }
            

            return ReturnSucesso(res,res_produto)

        }catch(e){

            return ReturnErroCatch(res, e.message)

        }
    }   

    public async atualiuzar (req: Request, res: Response){
        try{

            const {  
                id,
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                quantidade 
            } = req.body; 

            let infos = {
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                estoque:quantidade,
                servico:false
            }

            
            if(typeof id == "undefined"){
                return ReturnErroPadrao(res, 3 )
            }

            if(typeof margem == "undefined"){
                infos.margem = 20
            }

            if(typeof ativo == "undefined"){
                infos.ativo = true
            }

            if(typeof infos.estoque == "undefined"){
                infos.estoque = 0
            }

            if( margem < 10){
                return ReturnErroPadrao(res, 4 )
            }

            if(typeof quantidade == "undefined" || quantidade == ""){
                return ReturnErroPadrao(res, 3 )
            } 

            infos.valorVenda = this.calculavalorVenda(valorCompra,infos.margem )

            const res_produto = await ProdutoModel.atualizar(id, infos)

            return ReturnSucesso(res,res_produto)

        }catch(e){
            return ReturnErroCatch(res, e.message)
        }

    }


    public async buscar(req: Request, res: Response){
        try{

            let infos = { }
            let limit:number = 50
            if(typeof req.query != "undefined" && typeof req.query.id  != "undefined"){
                infos._id = req.query.id
            }

            if(typeof req.query != "undefined" && typeof req.query.search  != "undefined" && req.query.search  != "undefined" && req.query.search  != ""){
                infos.nome ={ 
                    $regex: new RegExp(req.query.search, 'i') // 'i' para insensibilidade a maiúsculas e minúsculas
                }
                limit = 0
            }


            if(typeof req.query != "undefined" && typeof req.query.tipo  != "undefined" && req.query.tipo  != "undefined" && req.query.tipo  != ""){

                infos.tipo = req.query.tipo

            }

            

            const produtos = await ProdutoModel.buscar(infos, limit)
           
            return ReturnSucesso(res,produtos)
        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }

}
export default new ProdutoControlle()