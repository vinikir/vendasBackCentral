import ProdutoShema from "../schemas/Produto"

class ProdutoModel {

    public async getAll(){
        console.log(await ProdutoShema.find())
    }

    public async salvar(infos:object){

        try{

            return await ProdutoShema.create(infos)

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
        
    }

    public async buscar(infos:object, limit:number) {
        try{

            return await ProdutoShema.find(infos).sort({'nome':1}).limit(limit)

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