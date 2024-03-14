const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
const textSelect = document.getElementById("select");
const numberInitial = document.getElementById("initial");
const numberFinal = document.getElementById("final");
const textSuccess = document.getElementById("success");
const textSuccess2 = document.getElementById("success2");
setButton.addEventListener("click", () => {
  const title = titleInput.value;
  const select = textSelect.value;
  const initial = numberInitial.value;
  const final = numberFinal.value;

  if (!title) {
    textSuccess.innerHTML = "Você deve fornecer um TOKEN para prosseguir!";
    return;
  } else if (select === "Selecione o tipo") {
    textSuccess.innerHTML = "Selecione o tipo para prosseguir!";
    return;
  } else if (!initial) {
    textSuccess.innerHTML = "Digite o ID inicial para apagar!";
    return;
  } else if (!final) {
    textSuccess.innerHTML = "Digite o ID final para apagar!";
    return;
  } else {
    textSuccess.innerHTML = `Modo ${select}: apagadas com sucesso!`;
  }

  window.electronAPI.setTitle({
    token: title,
    select,
    initial,
    final,
  });
});

const textCode = document.getElementById("code");
const textName = document.getElementById("name");
const textFee = document.getElementById("fee");
const textSelect2 = document.getElementById("select2");
const setButtonTwo = document.getElementById("btn2");
setButtonTwo.addEventListener("click", () => {
  const title = titleInput.value;
  const code = textCode.value;
  const name = textName.value;
  const select = textSelect2.value;
  const fee = textFee.value;
  if (!title) {
    textSuccess2.innerHTML = "Você deve fornecer um TOKEN para prosseguir!";
  } else if (select === "Selecione o tipo") {
    textSuccess2.innerHTML = "Selecione o tipo!";
  } else if (!code) {
    textSuccess2.innerHTML = "Digite o código para adicionar!";
  } else {
    textSuccess2.innerHTML = `Modo ${select}: criada com sucesso!`;
  }

  window.electronAPI.setTable({
    token: title,
    code,
    name,
    fee,
    select,
  });
});
