export interface ProdutoVenda {
    produtoId: string;
    qtd: number;
}

export interface ProdutoEstoque {
    _id: string;
    nome: string;
    estoque: number;
    tipo: string; // ex: "venda", "servico", etc
}