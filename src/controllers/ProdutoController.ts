import { Request, Response } from "express";
import { ReturnSucesso, ReturnErroPadrao, ReturnErro, ReturnErroCatch } from "../helpers/helper"
import ProdutoModel from "../models/ProdutoModel";
import KardexModel from "../models/KardexModel";
import moment from "moment-timezone";
import { ProductSearchParams } from "../interfaces/Interface";
import { ProdutoInterface, ProdutoInterfaceUpdate } from "../schemas/Produto";
import { kardexTiposEnums } from "../enums/KardexTiposEnums";
import { CategoriaProdutosEnums } from "../enums/CategoriaProdutosEnums";
import { ajustarPesquisaParaBuscaLike } from "../helpers/Funcoes";
import GrupoProdutosModel from "../models/GrupoProdutosModel";
class ProdutoControlle {

    private calculavalorVenda(custo:number, margem:number): number {
        const margemEmReais = custo * (margem / 100);

        const valorVenda = custo + margemEmReais;

        return parseFloat(valorVenda.toFixed(2));
    }

    private validarCategorias(categorias: string[]): boolean {
        return categorias.every((categoria: string) =>
            Object.values(CategoriaProdutosEnums).includes(categoria.toLowerCase() as CategoriaProdutosEnums)
        );
    }
    // private validarCategorias(categorias: Array<string>): boolean {
    //     return categorias.every((categoria:string) =>
    //       Object.values(CategoriaProdutosEnums).includes(categoria.toLowerCase())
    //     );
    // }

    public async entrada(req: Request, res: Response): Promise<object> {
        try {
            const {
                id,
                valorCompra,
                valorVenda,
                descontoMaximo,
                margem,
                observacao
            } = req.body;

            const quantidade: number = req.body.quantidade
            const avgValor: boolean = req.body.avgValor
            
            let infos = {
                valorCompra,
                valorVenda,
                descontoMaximo,
                margem,
                estoque: quantidade,
                observacao
            }

            if(typeof infos.estoque === "string" && !isNaN(Number(infos.estoque))){
                infos.estoque = Number(infos.estoque)
            }
            let res_Busca = await ProdutoModel.buscarPorId(id)

            if (res_Busca.length <= 0) {
                return ReturnErroPadrao(res, 15)
            }

            let produto: ProdutoInterfaceUpdate = res_Busca[0]
            let tipo = produto.tipo
            let quantidadeAtual = produto.estoque
            infos.estoque = quantidade + quantidadeAtual


            if (typeof avgValor != "undefined" && avgValor == true && infos.estoque > 0) {

                const valoresAntigos = produto.valorVenda * produto.estoque
                const valorVendaNovo = parseFloat(valorVenda) * quantidade
                const valoresSomados = valoresAntigos + valorVendaNovo


                let avg = valoresSomados / infos.estoque
                infos.valorVenda = avg.toFixed(2)

            }

            if (typeof margem == "undefined" && tipo == "venda") {
                infos.margem = 20
            }

            if (margem < 10 && tipo == "venda") {
                return ReturnErroPadrao(res, 3)
            }



            const res_produto = await ProdutoModel.atualizar(id, infos)

            if (tipo != "servico") {

                const infosKardex = {
                    tipo: kardexTiposEnums.Entrada,
                    nome: produto.nome,
                    idProduto: id,
                    valor: infos.valorVenda,
                    data: moment().tz("America/Sao_Paulo").format(),
                    qtd: quantidade
                }

                await KardexModel.salvar(infosKardex)

            }

            return ReturnSucesso(res, res_produto)

        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
            

    }

    public async salvar(req: Request, res: Response): Promise<object> {
        try {


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
                observacao,
                categoria,
                imgAdicional,
                img,
                valorVenda,
                grupo,
                localizacao
            }: ProdutoInterface = req.body;

           

            let  quantidade = req.body.quantidade

            if(typeof quantidade === "undefined" && !isNaN(Number(quantidade))){
                quantidade = Number(quantidade)
            }

            let infos = {
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                estoque: quantidade,
                tipo: tipo,
                marca,
                sku,
                codigoBarra,
                aplicacao,
                observacao,
                valorVenda,
                grupo,
                localizacao,
                img,
                imgAdicional,
                categoria
            }

            if (typeof margem == "undefined" && tipo == "venda") {
                infos.margem = 20
            }

            if (margem < 10 && tipo == "venda") {
                return ReturnErroPadrao(res, 3)
            }


            if (typeof tipo == "undefined" || (tipo != "insumo" && tipo != "venda" && tipo != "servico")) {
                return ReturnErroPadrao(res, 8)
            }

            if (typeof ativo == "undefined") {
                infos.ativo = true
            }

            if (typeof img != "undefined") {
                infos.img = img
            }

            if (typeof imgAdicional != "undefined") {
                infos.imgAdicional = imgAdicional
            }

            if ((typeof quantidade == "undefined" || quantidade == "") && tipo != "servico") {
                return ReturnErroPadrao(res, 3)
            }


            if (tipo == "venda") {

                if ((typeof categoria == "undefined")) {
                    return ReturnErroPadrao(res, 10)
                }

                if (typeof categoria != "object") {
                    return ReturnErroPadrao(res, 11)
                }

                if (categoria.length <= 0) {
                    return ReturnErroPadrao(res, 12)
                }

                if (this.validarCategorias(categoria) == false) {
                    return ReturnErroPadrao(res, 13)
                }

                infos.categoria = categoria.map(str => str.toLowerCase());
                
            }else if (tipo == "servico") {

                infos.categoria = ["servico"]
                infos.estoque = 0
                infos.sku = ""
                infos.codigoBarra = ""
                infos.marca = ""
                infos.aplicacao = ""
                infos.grupo = ""
                infos.localizacao = []
                infos.valorCompra = 0


            }



            const res_produto = await ProdutoModel.salvar(infos)

            if (tipo != "servico") {

                const infosKardex = {
                    tipo: kardexTiposEnums.Entrada,
                    nome: nome,
                    idProduto: res_produto._id,
                    valor: infos.valorVenda,
                    data: moment().tz("America/Sao_Paulo").format(),
                    qtd: quantidade
                }

                await KardexModel.salvar(infosKardex)

            }

            if (typeof grupo != "undefined") {
                GrupoProdutosModel.salvar(grupo)
            }


            return ReturnSucesso(res, res_produto)

        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

    public async atualiuzar(req: Request, res: Response) {
        try {

            const {
                id,
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                quantidade,
                tipo,
                localizacao
            } = req.body;

            let infos:ProdutoInterfaceUpdate = {
                ativo,
                nome,
                descricao,
                valorCompra,
                descontoMaximo,
                margem,
                localizacao,
                estoque: quantidade,
                tipo: tipo,
                valorVenda:0
            }


            if (typeof id == "undefined") {
                return ReturnErroPadrao(res, 3)
            }

            if (typeof margem == "undefined") {
                infos.margem = 20
            }

            if (typeof ativo == "undefined") {
                infos.ativo = true
            }

            if (typeof infos.estoque == "undefined") {
                infos.estoque = 0
            }

            if (margem < 10) {
                return ReturnErroPadrao(res, 4)
            }

            if (typeof quantidade == "undefined" || quantidade == "") {
                return ReturnErroPadrao(res, 3)
            }

            infos.valorVenda = this.calculavalorVenda(valorCompra, infos.margem)

            const res_produto = await ProdutoModel.atualizar(id, infos)

            return ReturnSucesso(res, res_produto)

        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }

    }


    public async buscar(req: Request, res: Response) {
        try {

            let infos: any = {}
            let limit: number = 50
            let offset: number = 0

            const query: ProductSearchParams = req.query

            if (typeof query != "undefined" && typeof query.id != "undefined") {
                infos._id = query.id
            }

            if (typeof query != "undefined" && typeof query.search != "undefined" && query.search != "undefined" && query.search != "") {
                const busca = ajustarPesquisaParaBuscaLike(query.search)
                infos.nome = {
                    $regex: busca
                }
                limit = 0
            }


            if (typeof query != "undefined" && typeof query.tipo != "undefined" && query.tipo != "undefined" && query.tipo != "") {

                infos.tipo = query.tipo

            }

            if (typeof query != "undefined" && typeof query.limit != "undefined") {

                limit = query.limit

            }

            if (typeof query != "undefined" && typeof query.offset != "undefined") {

                offset = query.offset

            }



            const produtos = await ProdutoModel.buscarComLimit(infos, limit, offset)

            return ReturnSucesso(res, produtos)
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }

    public async buscarPorCodigoDeBarras(req: Request, res: Response) {
        try {



            const { codigo } = req.params

            const produtos = await ProdutoModel.buscarPorCodigoDeBarras(codigo)

            return ReturnSucesso(res, produtos)
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }





    public async BuscaComValor(req: Request, res: Response) {
        try {
            let retorno = {
                valorTotalCMargem: 0,
                valorTotalSMargem: 0
            }
            let valorTotal = 0
            let valorTotals = 0

            const produtos = await ProdutoModel.buscar({ estoque: { $gt: 0 }, tipo: "venda" })


            for (let index = 0; index < produtos.length; index++) {
                const produto:ProdutoInterface = produtos[index];

                valorTotal = valorTotal + (produto.valorVenda * produto.estoque)
                valorTotals = valorTotals + (produto.valorCompra * produto.estoque)
            }

            retorno.valorTotalCMargem = parseFloat(valorTotal.toFixed(2))
            retorno.valorTotalSMargem = parseFloat(valorTotals.toFixed(2))

            return ReturnSucesso(res, retorno)
        } catch (e: unknown) {
          
            if (e instanceof Error) {
                return ReturnErroCatch(res, e.message)
            }
            return ReturnErroCatch(res, "Erro inesperado")
            
        }
    }
}
export default new ProdutoControlle()