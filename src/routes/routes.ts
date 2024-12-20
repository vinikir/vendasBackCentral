import { Router} from 'express'

import UserController from '../controllers/UserController'
import ProdutoController from '../controllers/ProdutoController'
import FinanceiroController from '../controllers/FinanceiroController'
import VendaController from '../controllers/VendaController'
import OrcamentoController from '../controllers/OrcamentoController'
import OrdemServicoController from '../controllers/OrdemServicoController'
import StorageController from '../controllers/StorageController'
import multer from 'multer'
import VersoesAppController from '../controllers/VersoesAppController'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage});

const routes = Router()

routes.get('/', (req, res) => {
    res.send({"versao":"5"})
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

routes.post('/investimento-salvar',FinanceiroController.EntradaInvestimento )
routes.post('/investimento-saida-compra',FinanceiroController.SaidaInvestimentoMercadoria )
routes.get('/caixa',FinanceiroController.BuscaCaixa.bind(FinanceiroController) )


routes.post('/venda',VendaController.RegistrarVenda )
routes.get('/venda',VendaController.BuscarVenda )

routes.get('/frete-correio',VendaController.freteCorreios )


routes.post('/ordem-servico/salvar',upload.any(), OrdemServicoController.salvar)

routes.post('/imagem/salvar', upload.any(), StorageController.salvaImagemS3)
routes.post('/versao/update', upload.any(), VersoesAppController.upLoadNovaVersao)
routes.post('/verifica-update', VersoesAppController.verificaUpdate)




routes.post('/ordem-servico/salvar', OrdemServicoController.salvar)

routes.post('/imagem/salvar', upload.any(), StorageController.salvaImagemS3)






export default routes