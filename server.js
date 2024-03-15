const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8081;

// Middleware para permitir solicitações de origens diferentes (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitações de qualquer origem
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permitir métodos HTTP especificados
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Permitir cabeçalhos especificados
  next();
});

//Middleware para fazer o parse do corpo da requisição
app.use(bodyParser.json());

/// Rota para lidar com ações de exclusão
app.post('/api/v1/actions', async (req, res) => {
  const token = req.body.token;
  const select = req.body.select;
  const select2 = req.body.select2;
  const initial = req.body.initial;
  const final = req.body.final;
  const nome = req.body.apelido;
  const taxa = req.body.taxa;

  try {
      switch((select)){
        case "table":
          // AÇÕES DE MESA
          switch(select2) {
            case 1:// Cadastrar Mesa
            console.log("Opção 2 selecionada Cadastrar Mesa");
            //--------------------------------------------------------
            async function CreateTable(tableNumber, newData) {
              try {
                const response = await axios.post(`https://developers.abrahao.com.br/api/v1/tables`, newData, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Especifica que os dados são JSON
                  }
                });
                console.log(`Mesa ${tableNumber} Cadastradas com sucesso:`, response.data);
              } catch (error) {
                console.error(`Erro Cadastrar Mesa ${tableNumber}:`, error.response.data);
              }
            }
    
            // Itera sobre as mesas e atualiza cada uma
            for (let i = initial; i <= final; i++) {
              
              const newData = {
                code: i,
                name: nome, // Novo nome da mesa
                service_percentage: taxa // Nova porcentagem de serviço
              };
    
              await CreateTable(i, newData);
            }
            res.json({ success: true, message: `Ações concluídas com sucesso para ${select}s ${initial} até ${final}!` });
            //--------------------------------------------------------
              break;
            case 2:// Atualizar Mesa
            console.log("Opção 2 selecionada Atualizar Mesa");
                async function updateTable(tableNumber, newData) {
                  try {
                    const response = await axios.put(`https://developers.abrahao.com.br/api/v1/table/${tableNumber}`, newData, {
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' // Especifica que os dados são JSON
                      }
                    });
                    console.log(`Mesa ${tableNumber} atualizada com sucesso:`, response.data);
                  } catch (error) {
                    console.error(`Erro ao atualizar mesa ${tableNumber}:`, error.response.data);
                  }
                }
        
                // Itera sobre as mesas e atualiza cada uma
                for (let i = initial; i <= final; i++) {
                  const newData = {
                    name: nome, // Novo nome da mesa
                    service_percentage: taxa // Nova porcentagem de serviço
                  };
        
                  await updateTable(i, newData);
                }
                res.json({ success: true, message: `Ações concluídas com sucesso para ${select}s ${initial} até ${final}!` });
              break;
            case 3:// Excluir Mesa
            // ------------------------------------------------------------------------------------------------------------
                    async function DeleteTable(token, initial, final) {
                      try {

                          for (let i = initial; i <= final; i++) {
                              const response = await axios.delete(`https://developers.abrahao.com.br/api/v1/table/${i}`, {
                                  headers: {
                                      'Authorization': `Bearer ${token}`,
                                      'Content-Type': 'application/json' // Especifica que os dados são JSON
                                  }
                              });
                              
                              console.log(`Mensagem da API Abrahão>> ${response.data.message}: ${i}`, response.data);
                          }
                          res.json({ success: true, message: `Ações concluídas com sucesso para ${select}s ${initial} até ${final}!` });
                      } catch (error) {
                          console.error(`Erro ao excluir mesa ${tableNumber}`, error.response.data);
                      }
                    }
                    await DeleteTable(token, initial, final);
              // ------------------------------------------------------------------------------------------------------------
              break;
            default:
              console.log("A Opção("+select2+") inválida selecionada");
          }
          break;
        case 2:
          console.log("Opção 2 selecionada");
          // Faça algo para a opção 2
          break;
        case 3:
          console.log("Opção 3 selecionada");
          // Faça algo para a opção 3
          break;
        default:
          console.log("A Opção("+select+") inválida selecionada");
    // Faça algo para o caso em que nenhuma opção correspondente é encontrada
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Erro ao realizar ações: ${error.message}` });
  }
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);

});
