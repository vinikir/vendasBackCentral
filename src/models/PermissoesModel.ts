import Permissoes from "../schemas/Permissoes"

class PermissoesModel {
    /**
     * Salva as informações de permissão no banco de dados
     * @param infos - Informações a serem salvas
     * @returns - Retorna o objeto salvo
    */
    public async salvar(infos:object):Promise<object>{

        try{
            
            return await Permissoes.create(infos)

        }catch(e){

            throw new Error(e.message);

        }
        
    }

    public async buscarPorId(id:string):Promise<object>{
        try{
            
            return await Permissoes.findOne({_id:id})

        }catch(e){

            throw new Error(e.message);

        }
        
    }

    public async buscarTodos():Promise<object>{
        try{
            
            return await Permissoes.find({})

        }catch(e){

            throw new Error(e.message);

        }
        
    }
}

export default new PermissoesModel()
