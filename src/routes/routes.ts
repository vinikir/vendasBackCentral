import { Router} from 'express'

import UserController from '../controllers/UserController'
import ProdutoController from '../controllers/ProdutoController'


const routes = Router()

routes.get('/', (req, res) => {
    res.send({"versao":"01"})
})	

routes.get('/e',UserController.buscarTodos)	
routes.post('/user',UserController.create.bind(UserController))	
routes.post('/login',UserController.login)	

routes.post('/produto',ProdutoController.salvar.bind(ProdutoController))	
routes.get('/produtos',ProdutoController.buscar)	






export default routes