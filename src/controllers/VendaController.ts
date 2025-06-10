import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErro, ReturnErroCatch } from "../helpers/helper"

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

interface ProdutoVenda {
    produtoId: string;
    qtd: number;
    valorTotal: number;
}

interface PagamentoInfo {
    metodo: string;
}

interface InfosSalvar {
    user: string;
    userId: string;
    tipoVenda: string;
    produtos: ProdutoVenda[];
    status: string;
    pagamento: PagamentoInfo[];
    data: string;
    valor: number;
    clienteId?: string;
    clienteNome?: string;
}

interface Cliente {
    _id: any; // Use ObjectId se tiver importado do Mongo
    nome: string;
    [key: string]: any;
}
class VendaController {

    public async BuscarVenda(req: Request, res: Response) {
        try {
            const inicial = typeof req.query.inicial === 'string' ? req.query.inicial : '';
            const final = typeof req.query.final === 'string' ? req.query.final : '';
            const produtos = await VendaModel.busca(inicial, final);
            return ReturnSucesso(res, produtos);
        } catch (e: unknown) {
            if (e instanceof Error) return ReturnErroCatch(res, e.message);
            return ReturnErroCatch(res, "Erro inesperado");
        }
    }

    public async BuscarVendaProVendedor(req: Request, res: Response) {
        try {
            const { dataInicio, dataFim, userId }: { dataInicio: string; dataFim: string; userId: string } = req.body;
            const produtos = await VendaModel.buscaProVendedor(dataInicio, dataFim, userId);
            return ReturnSucesso(res, produtos);
        } catch (e: unknown) {
            if (e instanceof Error) return ReturnErroCatch(res, e.message);
            return ReturnErroCatch(res, "Erro inesperado");
        }
    }


    public async buscarFaturados(req: Request, res: Response) {
        try {
            const faturados = await FaturadoModel.busca();
            const vendaIds = faturados.map((f: any) => f.vendaId);
            const vendas = await VendaModel.buscarPorArray(vendaIds);
            const vendaMap = new Map(vendas.map((v: any) => [v._id.toString(), v]));
            const resultado = faturados.map((faturado: any) => ({
                ...faturado.toObject(),
                venda: vendaMap.get(faturado.vendaId) || null
            }));
            return ReturnSucesso(res, resultado);
        } catch (e: unknown) {
            if (e instanceof Error) return ReturnErroCatch(res, e.message);
            return ReturnErroCatch(res, "Erro inesperado");
        }
    }

    public async RegistrarVenda(req: Request, res: Response) {
        try {
            const { userId, tipoVenda, produtos, user, status, pagamento, valor, clienteId } = req.body;
            const produtosIds = ExtrairProdutoIds(produtos);

            for (const pag of pagamento as PagamentoInfo[]) {
                if (pag.metodo === MetodoPagamentoEnums.faturado && typeof clienteId === "undefined") {
                    return ReturnErroPadrao(res, 16);
                }
            }

            const buscaProdutoQury = {
                _id: { "$in": produtosIds }
            };
            const produtosBuscaPorId = await ProdutoModel.buscar(buscaProdutoQury);
            const res_ValidaSaldoPositivo = ValidaSaldoPositivo(produtos, produtosBuscaPorId);

            if (!res_ValidaSaldoPositivo.valido) {
                return ReturnErro(res, res_ValidaSaldoPositivo.tipo, 400);
            }

            const InfosSalvar: InfosSalvar = {
                user,
                userId,
                tipoVenda,
                produtos,
                status,
                pagamento,
                data: moment().tz("America/Sao_Paulo").format(),
                valor
            };

            let cliente: Cliente[] = [];


            if (typeof clienteId !== "undefined") {

                cliente = await UserModel.buscaPorId(clienteId);

                if (cliente.length === 0) {

                    return ReturnErroPadrao(res, 17);
                }

                InfosSalvar.clienteId = cliente[0]._id.toString();
                InfosSalvar.clienteNome = cliente[0].nome;

            }

            const res_salvarVenda = await VendaModel.salvar(InfosSalvar);

            if (typeof res_salvarVenda._id === "undefined") {
                throw new Error("Erro ao salvar venda");
            }

            for (const pag of pagamento as PagamentoInfo[]) {

                if (pag.metodo === MetodoPagamentoEnums.faturado) {

                    if(cliente.length === 0) {
                        return ReturnErroPadrao(res, 17);

                    }

                

                    const infosFaturado = {
                        user,
                        userId,
                        tipoVenda,
                        status: StatusFaturadoEnum.aberto,
                        pagamento: [],
                        data: moment().tz("America/Sao_Paulo").format(),
                        valor,
                        vendaId: res_salvarVenda._id.toString(),
                        cliente: cliente[0],
                        faturamentoId:0
                    };
                    

                    FaturadoModel.salvar(infosFaturado);

                }
            }

            for (const produto of produtosBuscaPorId) {

                const produtoVendidoEncontrado = produtos.find((el: ProdutoVenda) => el.produtoId === produto._id);

                if (!produtoVendidoEncontrado) continue;

                let novoSaldo: number;

                if (produto.tipo === "servico") {

                    novoSaldo = (produto.estoque || 0) + produtoVendidoEncontrado.qtd;

                } else {

                    novoSaldo = produto.estoque - produtoVendidoEncontrado.qtd;

                }

                await ProdutoModel.atualizar(produto._id, { estoque: novoSaldo });
                const infosKardex = {
                    tipo: kardexTiposEnums.Venda,
                    nome: produto.nome,
                    idProduto: produto._id,
                    valor: produtoVendidoEncontrado.valorTotal,
                    data: moment().tz("America/Sao_Paulo").format(),
                    observasao: "",
                    qtd: produtoVendidoEncontrado.qtd,
                    vendaId: res_salvarVenda._id
                };
                await KardexModel.salvar(infosKardex);
            }

            return ReturnSucesso(res, res_salvarVenda);
        } catch (e: unknown) {
            if (e instanceof Error) return ReturnErroCatch(res, e.message);
            return ReturnErroCatch(res, "Erro inesperado");
        }
    }

    public async freteCorreios(req: Request, res: Response): Promise<any> {
        try {
            const usuario = "55744795000134";
            const senha = "bSfidQaao5MVfmlxhzp49uq7xq0eXhNYymSMEnkS";
            const cepOrigem: string = "06386670";
            const cepDestino: string = "05379000";
            const peso: number = 0.5;
            const comprimento: number = 0.20;
            const largura: number = 0.20;
            const altura: number = 0.20;

            const urlCorreio = "https://api.correios.com.br/token/v1/autentica";

            const res_toke = await axios.post(urlCorreio + '/cartaopostagem', {}, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${usuario}:${senha}`).toString('base64')}`,
                },
            });

            const token: string = res_toke.data.token;
            console.log(res_toke);

            const params = {
                nCdServico: '40045',
                sCepOrigem: cepOrigem,
                sCepDestino: cepDestino,
                nVlPeso: peso,
                nVlComprimento: comprimento,
                nVlAltura: altura,
                nVlLargura: largura,
                nCdFormato: 1,
                nVlDiametro: 0,
                sCdMaoPropria: 'N',
                sCdAvisoRecebimento: 'N',
            };

            return ReturnSucesso(res, "ok");
        } catch (e: unknown) {
            if (e instanceof Error) return ReturnErroCatch(res, e.message);
            return ReturnErroCatch(res, "Erro inesperado");
        }
    }


    public async BuscarComisssoes(req: Request, res: Response) {
        try {
            console.log(req.query);
            return ReturnSucesso(res, "asd");
        } catch (e: unknown) {
            if (e instanceof Error) return ReturnErroCatch(res, e.message);
            return ReturnErroCatch(res, "Erro inesperado");
        }
    }



}
export default new VendaController()