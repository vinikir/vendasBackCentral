import { Router} from 'express'

import UserController from '../controllers/UserController'
import ProdutoController from '../controllers/ProdutoController'
import FinanceiroController from '../controllers/FinanceiroController'
import VendaController from '../controllers/VendaController'

const routes = Router()

routes.get('/', (req, res) => {
    res.send({"versao":"01"})
})	

routes.get('/e',UserController.buscarTodos)	
routes.post('/user',UserController.create.bind(UserController))	
routes.post('/login',UserController.login)	

routes.post('/produto',ProdutoController.salvar.bind(ProdutoController))	
routes.post('/produto/atualizar',ProdutoController.atualiuzar.bind(ProdutoController))	

routes.get('/produtos',ProdutoController.buscar)

routes.post('/investimento-salvar',FinanceiroController.EntradaInvestimento )
routes.post('/investimento-saida-compra',FinanceiroController.SaidaInvestimentoMercadoria )

routes.post('/venda',VendaController.RegistrarVenda )







export default routes