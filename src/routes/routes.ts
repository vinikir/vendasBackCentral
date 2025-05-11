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
import SociosController from '../controllers/SociosController'
import FuncionariosController from '../controllers/FuncionariosController'
import AporteController from '../controllers/AporteController'
import FonecedoresController from '../controllers/FonecedoresController'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage});

const routes = Router()

routes.get('/', (req, res) => {
    res.send({"versao":"2"})
})	

routes.post('/user',UserController.create.bind(UserController))	
routes.get('/user-buscar',UserController.buscar.bind(UserController))
routes.get('/e',UserController.buscarTodos)	

routes.post('/login',FuncionariosController.login)	
routes.post('/trocar-senha',FuncionariosController.trocarSenha )
routes.get('/vendedor-listar', FuncionariosController.listarVendedor)



routes.post('/orcamento/salvar', OrcamentoController.salvar)
routes.post('/orcamentos', OrcamentoController.buscar)
routes.post('/orcamento/salvar', OrcamentoController.salvar)
routes.post('/orcamentos', OrcamentoController.buscar)

routes.post('/produto',ProdutoController.salvar.bind(ProdutoController))	
routes.post('/produto/entrada',ProdutoController.entrada.bind(ProdutoController))	
routes.post('/produto/atualizar',ProdutoController.atualiuzar.bind(ProdutoController))	
routes.get('/produtos',ProdutoController.buscar)
routes.get('/produtos/codigobarras/:codigo',ProdutoController.buscarPorCodigoDeBarras)


routes.get('/faturados',VendaController.buscarFaturados)


routes.get('/grupoprodutos',GrupoProdutosController.buscar)


routes.post('/investimento-saida-compra',FinanceiroController.SaidaInvestimentoMercadoria )
routes.get('/caixa',FinanceiroController.BuscaCaixa.bind(FinanceiroController) )
routes.post('/investimento-buscar',FinanceiroController.BuscaInvetimentos.bind(FinanceiroController))
routes.get('/estoque-buscar',ProdutoController.BuscaComValor.bind(ProdutoController))
routes.post('/permissoes/salvar', PermissoesController.salvarPermissao)
routes.get('/permissoes', PermissoesController.getPermissoesTodos)

routes.post('/venda',VendaController.RegistrarVenda )
routes.get('/venda',VendaController.BuscarVenda )
routes.post('/venda/buscar/vendedor',VendaController.BuscarVendaProVendedor )
routes.post('/vendas-buscar',FinanceiroController.BuscaVendas.bind(FinanceiroController))

routes.post('/socios/salvar',SociosController.salvar)
routes.get('/socios',SociosController.buscarTodos)


routes.get('/frete-correio',VendaController.freteCorreios )

routes.post("/aporte/salvar", AporteController.EntradaInvestimento)


routes.post('/ordem-servico/salvar',upload.any(), OrdemServicoController.salvar)
routes.post('/ordem-servico/salvar', OrdemServicoController.salvar)

routes.post('/imagem/salvar', upload.any(), StorageController.salvaImagemS3)
routes.post('/imagem/salvar', upload.any(), StorageController.salvaImagemS3)

routes.post('/process-payment', IntegcaoMercadoPagoController.Pagamento)
routes.post('/pagamento/pix/qrcode', IntegcaoMercadoPagoController.PixQrCode)
routes.post('/pagamento/status', IntegcaoMercadoPagoController.ApagamentoStatus)

routes.post("/fornecedores", FonecedoresController.salvar);
routes.get("/fornecedores", FonecedoresController.listarTodos);
routes.get("/fornecedores/id/:id", FonecedoresController.buscarPorId);
routes.get("/fornecedores/documento/:documento", FonecedoresController.buscarPorDumento);
routes.get("/fornecedores/nome", FonecedoresController.buscarPorNome);
routes.put("/fornecedores/:id", FonecedoresController.atualizarPorId);



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