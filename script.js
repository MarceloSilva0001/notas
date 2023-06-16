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

