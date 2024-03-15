document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-button');
  
    copyButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const campo = this.parentNode;
        const texto = campo.querySelector('p').innerText;
  
        copyToClipboard(texto);
      });
    });
  
    function copyToClipboard(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Texto copiado: ' + text);
    }
  });

  // Amplia a imagem ao cliar em cima dela
  
  function ampliarImagem(imagem) {
    var imagemAmpliada = document.getElementById("imagem-ampliada");
    var imagemAmpliadaSrc = document.getElementById("imagem-ampliada-src");
    imagemAmpliadaSrc.src = imagem.src;
    imagemAmpliada.style.display = "block";
  }
  
  function fecharImagem() {
    var imagemAmpliada = document.getElementById("imagem-ampliada");
    imagemAmpliada.style.display = "none";
  }

  // abrir  imagem fora em outra guia
  function abrirImagemNovaGuia(imagemURL) {
    window.open(imagemURL, '_blank');
  }


  // mostra as ações de mesa se a mesa estiver selecionada

  document.getElementById("operation").addEventListener("change", function() {
    var selectedOption = this.value;
    var tableSelectDiv = document.getElementById("tableSelect");
    var apelido = document.getElementById("apelido");
    var taxa = document.getElementById("taxa");
    var initial = document.getElementById("initial");
    var final = document.getElementById("final");
    var ate = document.getElementById("ate");
    var labelGeral = document.getElementById("labelGeral");
    var labelMesa = document.getElementById("labelMesa");
    var atualizarOpt = document.getElementById("atualizarOpt");

    if (selectedOption === "table") {
        tableSelectDiv.style.display = "block";
        apelido.style.display = "block";
        taxa.style.display = "block";
        initial.style.display = "block";
        final.style.display = "block";
        ate.style.display = "block";
        atualizarOpt.style.display = "block";
        labelGeral.style.display = "block";
        labelMesa.style.display = "block";

    } 
    if (selectedOption === "card") {
      tableSelectDiv.style.display = "block";
      initial.style.display = "block";
      final.style.display = "block";
      ate.style.display = "block";
      labelGeral.style.display = "block";
  } 
});


// Recarrega a pagina após mudar o modo de operação
var selectedOnce = false;

document.getElementById('operation').addEventListener('change', function() {
    if (selectedOnce) {
        window.location.reload();
    } else {
        selectedOnce = true;
    }
});
// desce ao final da página sempre que selecionar um novo modeo de operação
document.getElementById('operation').addEventListener('change', function() {
  // Rolar para o final da página
  window.scrollTo(0, document.body.scrollHeight);
});

// alerta de envio para o api
document.getElementById('btn').addEventListener('click', function() {
alert("TEM CERTEZA DA AÇÃO QUE DESEJA FAZER?");
});

// alerta de token
document.getElementById('token').addEventListener('input', function() {
  var tokenValue = this.value;
  // Verifica se o valor do token é da loja desejada (substitua 'SuaLojaAqui' pelo ID da loja)
  if (tokenValue != '') {
      alert('Tem certeza que o TOKEN que deseja inserir é esse mesmo?');
  } else {
      alert('TOKEN Removido!');
  }
});


//valida se o token foi preechido antes de selecionar o modo de operação
document.getElementById('operation').addEventListener('click', function() {
  var tokenValue = document.getElementById('token').value;
  // Verifica se o campo de token está preenchido
  if (tokenValue === '') {
      alert('Por favor, preencha o campo de token antes de selecionar uma operação.');
  }
});


//valida se o usuario digitou os campos de de inicio e fim 
