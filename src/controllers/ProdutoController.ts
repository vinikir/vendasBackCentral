import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import ProdutoModel from "../models/ProdutoModel";

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

            if(typeof margem == "undefined"){
                infos.margem = 20
            }

            if(typeof ativo == "undefined"){
                infos.ativo = true
            }

            if( margem < 10){
                return ReturnErroPadrao(res, 3 )
            }

            if(typeof quantidade == "undefined" || quantidade == ""){
                return ReturnErroPadrao(res, 3 )
            } 

            infos.valorVenda = this.calculavalorVenda(valorCompra,infos.margem )

            const res_produto = await ProdutoModel.salvar(infos)
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

            let infos = {}
            
            if(typeof req.query != "undefined" && typeof req.query.id  != "undefined"){
                infos._id = req.query.id
            }

            const produtos = await ProdutoModel.buscar(infos)
           
            return ReturnSucesso(res,produtos)
        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }

}
export default new ProdutoControlle()