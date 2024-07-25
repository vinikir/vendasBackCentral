export const ValidarCpfCnpj = (valor: string): { valido: boolean; tipo: String, valor: String  } => {
    // Remove caracteres especiais e espaços
    const valorLimpo = valor.replace(/[^0-9]/g, '');

    // Valida se o valor tem tamanho válido para CPF ou CNPJ
    if (valorLimpo.length === 11) {
        return {
            valido: validarCpf(valorLimpo),
            tipo: 'CPF',
            valor:valorLimpo
        };
    } else if (valorLimpo.length === 14) {
        return {
            valido: validarCnpj(valorLimpo),
            tipo: 'CNPJ',
            valor:valorLimpo
        };
    } else {
        return {
            valido: false,
            tipo: 'CPF ou CNPJ indeterminado',
            valor:valorLimpo
        };
    }
}

function validarCpf(cpf: string): boolean {
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (cpf.match(/(\d)\1{10}/g)) return false;

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    if (resto !== parseInt(cpf[9])) return false;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    return resto === parseInt(cpf[10]);
}

function validarCnpj(cnpj: string): boolean {
    // Verifica se todos os dígitos são iguais (ex: 00.000.000/0001-00)
    if (cnpj.match(/(\d)\1{13}/g)) return false;

    // Calcula o primeiro dígito verificador
    let soma = 0;
    let pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj[i]) * pesos[i];
    }
    let resto = (soma % 11);
    let digito1 = resto < 2 ? 0 : 11 - resto;

    // Calcula o segundo dígito verificador
    soma = 0;
    pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj[i]) * pesos[i];
    }
    resto = (soma % 11);
    let digito2 = resto < 2 ? 0 : 11 - resto;

    // Verifica se os dígitos verificadores calculados são iguais aos do CNPJ
    return digito1 === parseInt(cnpj[12]) && digito2 === parseInt(cnpj[13]);
}

export  const ExtrairProdutoIds = (dados: { produtoId: string }[]): string[] => {
    return dados.map(item => item.produtoId);
}

export const ValidaSaldoPositivo = (produtosVenda: Array<object>, produtosEstoque: Array<object>) => {
  
    for (let index = 0; index < produtosVenda.length; index++) {
        
        const produto = produtosVenda[index];

        const produtoencontrado = produtosEstoque.filter(el => el._id == produto.produtoId)
        if(typeof produtoencontrado[0] == 'undefined'){

            return {
                valido: false,
                tipo: 'Item não encontrado',
            
            };

        }

        if(produtoencontrado[0].estoque < produto.qtd && produtoencontrado[0].tipo == "venda"){
            return {
                valido: false,
                tipo: 'O item '+ produtoencontrado[0].nome+ " não possui estoque suficiente",
            
            };

        }
        
    }

    return {
        valido: true,
        tipo: '',
    
    };
}