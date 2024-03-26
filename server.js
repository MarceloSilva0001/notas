const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const csvtojson = require('csvtojson');
const csv = require('csv-parser');
// inicialização
const upload = multer();
const PORT = process.env.PORT || 3000;
const app = express();

// Adicione sua chave de API aqui
const API_KEY = 'yfHSsJKqiaVjGHsssyXBwFbIozEU2S_Q';

// MIDDLEWARE
  // Middleware para permitir solicitações de origens diferentes (CORS)

  //Middleware para fazer o parse do corpo da requisição
  app.use(bodyParser.json());
  app.use
// ROTAS
  // Enviar Produtos 4.0
  app.post('/api/upload-csv', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }
  
      const produtosConvertidosParaJson = [];
  
      // Tratar os dados do CSV
      req.file.buffer
        .toString('utf8')
        .split('\n')
        .slice(1) // Ignorar a primeira linha do CSV (cabeçalho)
        .forEach(line => {
          const [name, price, code] = line.split(';').map(item => item.trim()); // Remover espaços em branco
          const convertedPrice = price ? parseFloat(price.replace(/[^\d,.]+/g, '').replace(',', '.').replace(/\.(?=.*\.)/g, '')) : 0;
          const convertedCode = code ? parseInt(code.replace(/[^\d]+/g, '')) : 0; // Verificar se o código está definido
  
          const produtoJson = {
            name: name ? String(name) : '', // Verificar se o nome está definido
            price: !isNaN(convertedPrice) ? convertedPrice : 0, // Verificar se o preço é um número válido
            code: code ? String(convertedCode) : '' // Verificar se o código está definido
          };
  
          produtosConvertidosParaJson.push(produtoJson);
        });
  
      // Mostrar os dados convertidos no console
      console.log('Produtos convertidos para JSON:', produtosConvertidosParaJson);
  
      // Enviar dados para a API usando axios
      const response = await axios.post('https://developers.abrahao.com.br/api/v1/products', produtosConvertidosParaJson, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Resposta da API:', response.data);
  
    } catch (error) {
      console.error('Erro ao receber planilha CSV ou enviar para a API:', error);
      res.status(500).json({ error: 'Erro ao receber planilha CSV ou enviar para a API' });
    }
  });

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`- Servidor Node.js rodando na porta ${PORT}`);
  console.log("- Para Fechar pressione as teclas ctrl+C");
  console.log('- Qualquer ação que fizer Na Página "Copia Ai!" relacionado ai Menu API, o servidor vai precisar estar Aberto ')

});
