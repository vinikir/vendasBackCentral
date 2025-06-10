import { ProdutoEstoque } from "../interfaces/ProdutosInteface";
import ProdutoShema, { ProdutoInterface } from "../schemas/Produto"

class ProdutoModel {

    public async getAll(){
      return await ProdutoShema.find()
    }

    public async salvar(infos:object){

        try{

            return await ProdutoShema.create(infos)

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
        
    }

    public async buscar(infos:object): Promise<Array<ProdutoInterface>> {
        try{
            
            return await ProdutoShema.find(infos).sort({'nome':1})

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    

    public async buscarPorCodigoDeBarras(buscarPorCodigoDeBarras:string) {
        try{
            
            return await ProdutoShema.find({codigoBarra:buscarPorCodigoDeBarras}).sort({'nome':1})

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }


    public async buscarComLimit(infos:object, limit:number, offset:number) {
        try{
            
            return await ProdutoShema.find(infos).sort({'nome':1}).limit(limit).skip(offset)

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    public async buscarPorId(id:string) {
        try{
            
            return await ProdutoShema.find({_id:id})

        }catch (e: unknown) {

            console.log(e)
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            // fallback genérico caso não seja um Error
            throw new Error("Erro inesperado");
        }
    }

    
    public async atualizar(id:string, infos:object){
        try{

            return await ProdutoShema.updateOne({_id:id}, infos, { new: true })

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

export default new ProdutoModel()