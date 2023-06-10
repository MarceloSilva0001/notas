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
  