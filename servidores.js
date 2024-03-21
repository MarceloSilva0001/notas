//INTERAÇÕES PARA PÁGINA DE SERVIDORES

var table = document.getElementById("serverTable");
var searchInput = document.getElementById("searchInput");

// Função para filtrar os servidores
function filterServers() {
  var filter = searchInput.value.toUpperCase();
  var rows = table.getElementsByTagName("tr");

  // Itera sobre as linhas da tabela e mostra ou esconde conforme o filtro
  for (var i = 0; i < rows.length; i++) {
    var serverName = rows[i].getElementsByTagName("td")[0];
    if (serverName) {
      var txtValue = serverName.textContent || serverName.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

// Adiciona evento de input ao campo de busca
searchInput.addEventListener("input", filterServers);

// Carrega os dados do arquivo lojas.json
fetch('lojas.json')
  .then(response => response.json())
  .then(data => {
    // Itera sobre cada servidor e adiciona uma linha na tabela
    data.forEach(server => {
      var row = table.insertRow();
      var cell = row.insertCell();
      var link = document.createElement("a");
      link.href = server.endereco;
      link.textContent = server.nome;
      link.classList.add("table-text");
      cell.appendChild(link);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar lojas.json:', error);
  });