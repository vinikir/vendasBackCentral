import { Router} from 'express'
const routes = Router()

routes.get('/', (req, res) => {
    res.send({"versao":"01"})
})	

export default routes