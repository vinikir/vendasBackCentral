import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao,ReturnErro, ReturnErroCatch } from "../helpers/helper"

import ProdutoModel from "../models/ProdutoModel";
import KardexModel from "../models/KardexModel";
import { ExtrairProdutoIds, ValidaSaldoPositivo } from "../helpers/Funcoes";
import VendaModel from "../models/VendaModel";
import moment from "moment-timezone";
import axios from 'axios';
import { kardexTiposEnums } from "../enums/KardexTiposEnums";
import { MetodoPagamentoEnums } from "../enums/MetodoPagamentoEnums";
import { StatusFaturadoEnum } from "../enums/StatusFaturadoEnum";
import UserModel from "../models/UserModel";
import FaturadoModel from "../models/FaturadoModel";
class VendaController {

    public async BuscarVenda(req: Request, res: Response){
        try{
            
            const {inicial, final} = req.query

            const produtos = await VendaModel.busca(inicial, final)

            return ReturnSucesso(res, produtos)

        }catch(e){

            return ReturnErroCatch(res, e.message)

        }
    }
   
    public async RegistrarVenda (req: Request, res: Response) {

        try{


            const { userId, tipoVenda,  produtos, user, status, pagamento, valor, clienteId} = req.body

            const produtosIds = ExtrairProdutoIds(produtos)

            

            for (let index = 0; index < pagamento.length; index++) {
                const pag = pagamento[index];

                if( pag.metodo  == MetodoPagamentoEnums.faturado && typeof clienteId == "undefined"){

                    return ReturnErroPadrao( res, 16)
                
                }

            }
               

            const buscaProdutoQury = {
                _id:{ "$in" :produtosIds}
            }

            const produtosBuscaPorId = await ProdutoModel.buscar(buscaProdutoQury)

            const res_ValidaSaldoPositivo = ValidaSaldoPositivo( produtos, produtosBuscaPorId )

            if(res_ValidaSaldoPositivo.valido == false){

                return ReturnErro(res, res_ValidaSaldoPositivo.tipo, 400 )

            }

            let InfosSalvar = {
                user,
                userId,
                tipoVenda,
                produtos,
                status,
                pagamento,
                data: moment().tz("America/Sao_Paulo").format(),
                valor: valor
            }

            let cliente

            if(typeof clienteId != "undefined"){

                cliente = await UserModel.buscaPorId(clienteId)
                if(cliente.length == 0){

                    return ReturnErro(res, 17, 400 )

                }

                InfosSalvar.clienteId = cliente[0]._id.toString()
                InfosSalvar.clienteNome = cliente[0].nome
            }
           
            const res_salvarVenda = await VendaModel.salvar(InfosSalvar)

            if(typeof res_salvarVenda._id == "undefined"){

                throw new Error("Erro ao salvar venda");

            }

            
            for (let index = 0; index < pagamento.length; index++) {

                const pag = pagamento[index];

                if( pag.metodo  == MetodoPagamentoEnums.faturado ){
                     
                    let infosFaturado = {
                        user,
                        userId,
                        tipoVenda,
                        status:StatusFaturadoEnum.aberto,
                        pagamento:[],
                        data: moment().tz("America/Sao_Paulo").format(),
                        valor: valor,
                        vendaId:res_salvarVenda._id.toString(),
                        cliente:cliente[0],

                    }

                    FaturadoModel.salvar(infosFaturado)
                    
                }
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
                    tipo: kardexTiposEnums.Venda,
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

            return ReturnSucesso(res, res_salvarVenda)

        }catch(e){

            return ReturnErroCatch(res, e.message)

        }

    }

    public async freteCorreios (req: Request, res: Response): Promise<{ preco: number; prazoEntrega: number } >{
        try{
            const codigoDeAcessoCorreios = "bSfidQaao5MVfmlxhzp49uq7xq0eXhNYymSMEnkS"
            const cepOrigem: string = "06386670"
            const cepDestino: string = "05379000"
            const peso: number = 0.5
            const comprimento: number = 0.20
            const largura: number = 0.20
            const altura: number = 0.20
            const tipoDeFrete:string = 'SEDEX'

            const usuario = "55744795000134"
            const senha = "bSfidQaao5MVfmlxhzp49uq7xq0eXhNYymSMEnkS"

            const urlCorreio = "https://api.correios.com.br/token/v1/autentica"

            const  res_toke = await axios.post(urlCorreio+'/cartaopostagem',{},{
                headers: {
                    Authorization: `Basic ${Buffer.from(`${usuario}:${senha}`).toString('base64')}`,
                },    
            }).catch((er) => {
                console.log(er)
            })
            const token:string = res_toke.data.token
            console.log(res_toke)

            const params = {
                "nCdServico": '40045', // Códigos dos serviços PAC e SEDEX
                "sCepOrigem": cepOrigem,
                "sCepDestino": cepDestino,
                "nVlPeso": peso,
                "nVlComprimento": comprimento,
                "nVlAltura": altura,
                "nVlLargura": largura,
                "nCdFormato": 1, // Formato do objeto (1 para caixa)
                "nVlDiametro": 0, // Diâmetro para cilindros (se aplicável)
                "sCdMaoPropria": 'N', // Se é mão própria (opcional)
                "sCdAvisoRecebimento": 'N', // Se é aviso de recebimento (opcional)
            };
            return ReturnSucesso(res, "ok")
            
        }catch(e){

            return ReturnErroCatch(res, e.message)

        }
    }

    
    


}
export default new VendaController()