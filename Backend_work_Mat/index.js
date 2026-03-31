//Define as constantes do projeto

const express = require('express'); 
const app = express();
const PORT = 3001;
const produtosRoutes = require('./routes/produtos'); // Exporta as routes

app.use(express.json())

app.get('/', (req, res) => { // Route para enviar texto no diretório 
    res.send('Servidor da API de estoque está rodando com sucesso!');
});

app.use('/produtos', produtosRoutes); // Define o que as routes dos produtos tem 

app.listen(PORT, () => { // Para mostrar aonde o servidor está rodando no terminal 
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
