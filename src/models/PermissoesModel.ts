import { PermissaoInterface } from "../interfaces/PermissaoInterface";
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

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
        
    }

    public async buscarPorId(id:string):Promise<PermissaoInterface | null> {
        try{
            
            return await Permissoes.findOne({_id:id})

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
        
    }

    public async buscarTodos():Promise<object>{
        try{
            
            return await Permissoes.find({})

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
        
    }
}

export default new PermissoesModel()
