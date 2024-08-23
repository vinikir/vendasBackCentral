import { Router} from 'express'

import UserController from '../controllers/UserController'
import ProdutoController from '../controllers/ProdutoController'
import FinanceiroController from '../controllers/FinanceiroController'
import VendaController from '../controllers/VendaController'
import OrcamentoController from '../controllers/OrcamentoController'
const routes = Router()

routes.get('/', (req, res) => {
    res.send({"versao":"01"})
})	

routes.get('/e',UserController.buscarTodos)	
routes.post('/user',UserController.create.bind(UserController))	
routes.post('/login',UserController.login)	
routes.post('/trocar-senha',UserController.trocarSenha )
routes.post('/orcamento/salvar', OrcamentoController.salvar)
routes.post('/orcamentos', OrcamentoController.buscar)

routes.post('/produto',ProdutoController.salvar.bind(ProdutoController))	
routes.post('/produto/atualizar',ProdutoController.atualiuzar.bind(ProdutoController))	

routes.get('/produtos',ProdutoController.buscar)

routes.post('/investimento-salvar',FinanceiroController.EntradaInvestimento )
routes.post('/investimento-saida-compra',FinanceiroController.SaidaInvestimentoMercadoria )
routes.get('/caixa',FinanceiroController.BuscaCaixa.bind(FinanceiroController) )


routes.post('/venda',VendaController.RegistrarVenda )
routes.get('/venda',VendaController.BuscarVenda )









export default routes