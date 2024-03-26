  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', async function() {
      const token = document.getElementById('token').value;
      const select = document.getElementById('operation').value;
      const select2 = parseInt(document.getElementById('tableOptions').value);
      const initial = parseInt(document.getElementById('initial').value);
      const final = parseInt(document.getElementById('final').value);
      const apelido = document.getElementById('apelido').value;
      const taxa = parseInt(document.getElementById('taxa').value);

      if (!token) {
        document.getElementById('select').textContent = "Você deve fornecer um token para prosseguir!";
        return;
      } else if (!select) {
        document.getElementById('success').textContent = "Selecione um Modo de Operação!";
        return;
      }else if (!select2) {
        document.getElementById('success').textContent = "Selecione Uma Ação!";
        return;
      } else if (!initial || !final) {
        document.getElementById('success').textContent = "Digite o ID inicial e final!";
        return;
      }
      
      try {
        const response = await fetch('https://notasback-production.up.railway.app/api/v1/acoes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: token,
            select: select,
            select2: select2,
            initial: initial,
            final: final,
            apelido:apelido,
            taxa: taxa
          })
        });

        const data = await response.json();
        if (response.ok) {
          document.getElementById('success').textContent = data.message;
        } else {
          document.getElementById('success').textContent = `Servidor Fechado o Mal instalado: ${data.error}`;
        }
      } catch (error) {
        console.error(error);
        document.getElementById('success').textContent = `Erro ao realizar ações 304: ${error.message}`;
      }
    });
  });


  document.getElementById('submitBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    const token = document.getElementById('token').value;

    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('token', token);

        try {
            const response = await fetch('https://notasback-production.up.railway.app/api/upload-file', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data);

            // Exibir um pop-up com base na resposta recebida
            if (data.success) {
                showAlertWithLink('Envio de Planilha bem-sucedido! Clique aqui para ver o que foi enviado', 'green', data);
            } else {
                showAlert('Erro ao Enviar Planilha: ' + data.message, 'red');
            }
            
        } catch (error) {
            console.error('Erro ao enviar planilha:', error);
            showAlert('Erro ao enviar planilha. Tenta Novamente', 'red');
        }
    } else {
        console.error('Nenhum arquivo selecionado');
    }
});

function showAlert(message, color) {
    // Criar um elemento de alerta
    const alertElement = document.createElement('div');
    alertElement.textContent = message;
    alertElement.style.backgroundColor = color;
    alertElement.style.color = 'white';
    alertElement.style.padding = '10px';
    alertElement.style.borderRadius = '5px';
    alertElement.style.position = 'fixed';
    alertElement.style.top = '50%';
    alertElement.style.left = '50%';
    alertElement.style.transform = 'translate(-50%, -50%)';
    alertElement.style.zIndex = '9999';

    // Adicionar o elemento de alerta ao corpo do documento
    document.body.appendChild(alertElement);

    // Remover o elemento de alerta após 5 segundos
    setTimeout(() => {
        alertElement.remove();
    }, 5000); // 5000 milissegundos = 5 segundos
}

function showAlertWithLink(message, color, jsonData) {
    // Criar um elemento de alerta
    const alertElement = document.createElement('div');
    alertElement.textContent = message;
    alertElement.style.backgroundColor = color;
    alertElement.style.color = 'white';
    alertElement.style.padding = '10px';
    alertElement.style.borderRadius = '5px';
    alertElement.style.position = 'fixed';
    alertElement.style.top = '50%';
    alertElement.style.left = '50%';
    alertElement.style.transform = 'translate(-50%, -50%)';
    alertElement.style.zIndex = '9999';
    alertElement.style.cursor = 'pointer'; // Alterar o cursor para indicar que o elemento é clicável

    // Adicionar um evento de clique para abrir o JSON em uma nova guia
    alertElement.addEventListener('click', () => {
        const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        window.open(jsonUrl, '_blank');
    });

    // Adicionar o elemento de alerta ao corpo do documento
    document.body.appendChild(alertElement);

    // Remover o elemento de alerta após 5 segundos
    setTimeout(() => {
        alertElement.remove();
    }, 5000); // 5000 milissegundos = 5 segundos
}

//login
function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Fazendo uma chamada Fetch para a rota de login no servidor Node.js
  fetch('https://notasback-production.up.railway.app/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
  })
  .then(response => {
      if (response.ok) {
          // Se a resposta for bem-sucedida, esconda o formulário de login e exiba o conteúdo da API
          var loginForm = document.getElementById('loginForm');
          var apiContent = document.getElementById('apiContent');
          if (loginForm && apiContent) {
              loginForm.style.display = 'none';
              apiContent.style.display = 'block';
          } else {
              console.error("Elemento HTML não encontrado.");
          }
      } else {
          // Se a resposta não for bem-sucedida, exiba uma mensagem de erro
          return response.json().then(data => {
              throw new Error(data.error || 'Credenciais inválidas. Por favor, tente novamente.');
          });
      }
  })
  .catch(error => {
      // Exibe um alerta com a mensagem de erro
      alert(error.message);
  });
}