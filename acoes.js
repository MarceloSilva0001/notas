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
        const response = await fetch('http://localhost:8081/api/v1/actions', {
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
          document.getElementById('success').textContent = `Erro ao realizar ações 303: ${data.error}`;
        }
      } catch (error) {
        console.error(error);
        document.getElementById('success').textContent = `Erro ao realizar ações 304: ${error.message}`;
      }
    });
  });