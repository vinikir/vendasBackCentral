import { Router} from 'express'

import UserController from '../controllers/UserController'
import ProdutoController from '../controllers/ProdutoController'
import FinanceiroController from '../controllers/FinanceiroController'
import VendaController from '../controllers/VendaController'
import OrcamentoController from '../controllers/OrcamentoController'
import OrdemServicoController from '../controllers/OrdemServicoController'
import StorageController from '../controllers/StorageController'
import multer from 'multer'
import GrupoProdutosController from '../controllers/GrupoProdutosController'
import { ReturnSucesso } from '../helpers/helper'
import { MetodoPagamentoEnums } from '../enums/MetodoPagamentoEnums'
import IntegcaoMercadoPagoController from '../controllers/IntegcaoMercadoPagoController'
import PermissoesController from '../controllers/PermissoesController'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage});

const routes = Router()

routes.get('/', (req, res) => {
    res.send({"versao":"2"})
})	

routes.post('/', (req, res) => {
    res.send({"versao":"3 post"})
})	


routes.get('/e',UserController.buscarTodos)	
routes.post('/user',UserController.create.bind(UserController))	
routes.post('/login',UserController.login)	
routes.post('/trocar-senha',UserController.trocarSenha )
routes.post('/orcamento/salvar', OrcamentoController.salvar)
routes.post('/orcamentos', OrcamentoController.buscar)
routes.get('/vendedor-listar', UserController.listarVendedor)

routes.post('/orcamento/salvar', OrcamentoController.salvar)
routes.post('/orcamentos', OrcamentoController.buscar)
routes.get('/user-buscar',UserController.buscar.bind(UserController))

routes.post('/produto',ProdutoController.salvar.bind(ProdutoController))	
routes.post('/produto/entrada',ProdutoController.entrada.bind(ProdutoController))	

routes.post('/produto/atualizar',ProdutoController.atualiuzar.bind(ProdutoController))	

routes.get('/produtos',ProdutoController.buscar)
routes.get('/produtos/codigobarras/:codigo',ProdutoController.buscarPorCodigoDeBarras)
routes.get('/faturados',VendaController.buscarFaturados)


routes.get('/grupoprodutos',GrupoProdutosController.buscar)


routes.post('/investimento-salvar',FinanceiroController.EntradaInvestimento )
routes.post('/investimento-saida-compra',FinanceiroController.SaidaInvestimentoMercadoria )
routes.get('/caixa',FinanceiroController.BuscaCaixa.bind(FinanceiroController) )
routes.post('/investimento-buscar',FinanceiroController.BuscaInvetimentos.bind(FinanceiroController))
routes.post('/vendas-buscar',FinanceiroController.BuscaVendas.bind(FinanceiroController))
routes.get('/estoque-buscar',ProdutoController.BuscaComValor.bind(ProdutoController))
routes.post('/permissoes/salvar', PermissoesController.salvarPermissao)
routes.get('/permissoes', PermissoesController.getPermissoesTodos)

routes.post('/venda',VendaController.RegistrarVenda )
routes.get('/venda',VendaController.BuscarVenda )
routes.post('/venda/buscar/vendedor',VendaController.BuscarVendaProVendedor )

routes.get('/frete-correio',VendaController.freteCorreios )



routes.post('/ordem-servico/salvar',upload.any(), OrdemServicoController.salvar)

routes.post('/imagem/salvar', upload.any(), StorageController.salvaImagemS3)

routes.post('/imagem/salvar', upload.any(), StorageController.salvaImagemS3)

routes.post('/process-payment', IntegcaoMercadoPagoController.Pagamento)
routes.post('/pagamento/pix/qrcode', IntegcaoMercadoPagoController.PixQrCode)
routes.post('/pagamento/status', IntegcaoMercadoPagoController.ApagamentoStatus)


routes.post('/ordem-servico/salvar', OrdemServicoController.salvar)

routes.post('/imagem/salvar', upload.any(), StorageController.salvaImagemS3)

routes.get('metodospagamentos',  (req, res):Response => {

    const ret = [
        [
            {
                id: '1', 
                label: 'Pix',
                value: MetodoPagamentoEnums.pix,
                
            },
            {
                id: '2',
                label: 'Dinheiro',
                value: MetodoPagamentoEnums.dinheiro,
               
            },
            {
                id: '3',
                label: 'Débito',
                value: MetodoPagamentoEnums.debito,
              
            },
            {
                id: '4',
                label: 'Crédito',
                value: MetodoPagamentoEnums.credito,
                
            },
            {
                id: '5',
                label: 'Faturado',
                value: MetodoPagamentoEnums.faturado,
               
            }
        ]
    ]

    return ReturnSucesso(res, ret)
    res.send({"versao":"3 post"})
})




export default routes