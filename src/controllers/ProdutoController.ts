import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"
import ProdutoModel from "../models/ProdutoModel";
import KardexModel from "../models/KardexModel";
import moment from "moment-timezone";
import { ProductSearchParams } from "../interfaces/Interface";
import { ProdutoInterface, ProdutoInterfaceUpdate } from "../schemas/Produto";
import { kardexTiposEnums } from "../enums/KardexTiposEnums";
class ProdutoControlle{

    private calculavalorVenda (custo, margem){
        const margemEmReais = custo * (margem / 100);

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
                marca,
                sku,
                codigoBarra,
                aplicacao,
                observacao
            }:ProdutoInterface = req.body; 

            const quantidade:number | string =  req.body.quantidade

            let infos:ProdutoInterface = {
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                estoque:quantidade,
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
                infos.estoque = 0
            }
            
            if(tipo == "venda" ){

                infos.valorVenda = this.calculavalorVenda(valorCompra,infos.margem )

            }else{

                infos.valorVenda = valorCompra

            }
            

            const res_produto = await ProdutoModel.salvar(infos)
            
            if(tipo != "servico" ){

                const infosKardex = {
                    tipo: kardexTiposEnums.Entrada,
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
                quantidade ,
                tipo
            } = req.body; 

            let infos:ProdutoInterfaceUpdate = {
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                estoque:quantidade,
                tipo:tipo
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

            let infos:any = { }
            let limit:number = 50
            let offset:number = 0
         
            const query:ProductSearchParams = req.query

            if(typeof query != "undefined" && typeof query.id  != "undefined"){
                infos._id = query.id
            }

            if(typeof query != "undefined" && typeof query.search  != "undefined" && query.search  != "undefined" && query.search  != ""){
                infos.nome ={ 
                    $regex: new RegExp(query.search, 'i') 
                }
                limit = 0
            }


            if(typeof query != "undefined" && typeof query.tipo  != "undefined" && query.tipo  != "undefined" && query.tipo  != ""){

                infos.tipo = query.tipo

            }
            
            if(typeof query != "undefined" && typeof  query.limit  != "undefined" ){

                limit = query.limit

            }

            if(typeof query != "undefined" && typeof  query.offset  != "undefined" ){

                offset = query.offset

            }

            

            const produtos = await ProdutoModel.buscar(infos, limit, offset)
           
            return ReturnSucesso(res,produtos)
        }catch(e){
            return ReturnErroCatch(res, e.message)
        }
    }

}
export default new ProdutoControlle()