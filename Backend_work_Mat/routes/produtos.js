//Define as constantes 
const express = require('express');
const router = express.Router();
const fs = require('fs');

function lerProdutos(){ // Função que lê o arquivo produtos.json
    const dados = fs.readFileSync('./data/produtos.json', 'utf-8');

    return JSON.parse(dados);
};

router.get('/', (req, res) => {  // route get-todos os produtos
    const produtos = lerProdutos();
    res.json(produtos);
});

router.get('/:id', (req, res) => {  // route get-produto por ID
    const id = Number(req.params.id);
    const produtos = lerProdutos();
    const produto = produtos.find(a => a.id === id);

    if (!produto) { //Verifica se existe o ID
        return res.status(404).json({
            erro: "produto não encontrado",
            mensagem: "Não existe nenhum produto com esse Id"
        });
    };

    res.json(produto);
});

router.post('/', (req, res) => { // route POS - adiciona os produtos no registro
    const { nome, descricao, preco, quantidade, categoria } = req.body;
    const produtos = lerProdutos();
    const novo = {
        id: alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1 , //calcula o id 
        nome,
        descricao,
        preco,
        quantidade, 
        categoria 
    };

    // verifica se nome e preço existem e se não estão vazios
    if (!nome || preco === undefined || preco === null) { 
        return res.status(400).json({ 
            erro: "Campos obrigatórios faltando", 
            mensagem: "O 'nome' e o 'preco' devem ser informados" 
        });
    }

    //Verifica se preço é um número positivo
    if (typeof preco !== 'number' || preco < 0) {
        return res.status(400).json({ erro: "O preço deve ser um número válido e positivo." });
    }

    //Verifica se quantidade é um número positivo

    if(typeof quantidade !== 'number' || quantidade < 0) {
        return res.status(400).json({ erro: "A quantidade deve ser um número válido positivo."})
    }

    produtos.push(novo);

    fs.writeFileSync('./data/produtos.json', JSON.stringify(produtos, null, 2));

    res.status(201).json(novo); //se der certo envia essa mensagem 
});

router.put(':id', (req, res) => { // route PUT modifica algum produto por ID
    const id = Number(req.params.id);
    const { nome, descricao, preco, quantidade, categoria } = req.body;
    const produtos = lerProdutos();
    const index= produtos.findIndex(a => a.id === id);

    if (!index) { //Verifica se existe pelo ID
        return res.status(404).json({
            erro: "produto não encontrado",
            mensagem: "Não existe nenhum produto com esse Id"
        });
    };

    produtos[index] = { id,nome, descricao, preco, quantidade, categoria };

    fs.writeFileSync('./data/produtos.json', JSON.stringify(produtos, null, 2));
    res.json(produtos[index]);
});

router.delete('/:id', (req, res) => {  // route DELETE deleta pelo ID
    const id = Number(req.params.id);
    const produtos = lerProdutos().filter(a => a.id !== id);

    if (!produtos) { //Verifica se  o Id existe
        return res.status(404).json({
            erro: "produto não encontrado",
            mensagem: "Não existe nenhum produto com esse Id"
        });
    };

    fs.writeFileSync('./data/produtos.json', JSON.stringify(produtos, null, 2));
    res.json({ mensagem: 'Produto removido!' });
});

module.exports = router; //Exporta as rotas
