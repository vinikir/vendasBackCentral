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

    public async buscar() {
        try{

            return await ProdutoShema.find()

        }catch(e){

            console.log(e)
            throw new Error(e.message);

        }
    }

    

    

    
}

export default new ProdutoModel()