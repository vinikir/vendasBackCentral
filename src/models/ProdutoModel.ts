import ProdutoShema from "../schemas/Produto"

class ProdutoModel {

    public async getAll(){
      return await ProdutoShema.find()
    }

    public async salvar(infos:object){

        try{

            return await ProdutoShema.create(infos)

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
        
    }

    public async buscar(infos:object) {
        try{
            
            return await ProdutoShema.find(infos).sort({'nome':1})

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
    }

    public async buscarComLimit(infos:object, limit:number, offset:number) {
        try{
            
            return await ProdutoShema.find(infos).sort({'nome':1}).limit(limit).skip(offset)

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
    }

    public async buscarPorId(id:string) {
        try{
            
            return await ProdutoShema.find({_id:id})

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
    }

    
    public async atualizar(id:string, infos:object){
        try{

            return await ProdutoShema.updateOne({_id:id}, infos, { new: true })

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
    }
    

    
}

export default new ProdutoModel()