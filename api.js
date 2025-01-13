// Realizando o fetch da API
fetch(`https://v6.exchangerate-api.com/v6/1ab91aca9f30ad177eb1a675/latest/USD`)
  .then((response) => response.json())
  .then((data) => {
    const currencies = Object.keys(data.conversion_rates);
    console.log(currencies);

    // Obtendo ID's das moedas selecionadas para conversão pelo usuário
    const fromDropDown = document.getElementById("from-currency");
    const toDropDown = document.getElementById("to-currency");

    //Desenvolvendo a interface da aba de seleção da moeda de origem para a conversão.
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      fromDropDown.add(option);
    });
    // Desenvolvendo a interface da aba de seleção da moeda de destino para a conversão
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      toDropDown.add(option);
    });

    // Declarando os valores padrões dos seletores
    fromDropDown.value = "BRL";
    toDropDown.value = "USD";

   

    //Função que faz o cálculo da conversão
    let convertCurrency = () => {
      const amount = document.querySelector("#user-value").value;
      const fromCurrency = fromDropDown.value;
      const toCurrency = toDropDown.value;

      let fromExchangeRate = data.conversion_rates[fromCurrency];
      let toExchangeRate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
      result.innerHTML = `Value: ${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    };

    //Evento que chama a função que converte os valores
    document
      .querySelector("#button")
      .addEventListener("click", convertCurrency);
    window.addEventListener("load", convertCurrency);

    document
      .getElementById("swap-currencies")
      .addEventListener("click", () => {
        const temp = fromDropDown.value;
        fromDropDown.value = toDropDown.value;
        toDropDown.value = temp;
        convertCurrency(); // Recalcula após a troca
      });
  });

// Evitar que a página recarregue ao enviar o formulário
const getForm = document
  .querySelector("form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });
 
 
const input = document.querySelector("#user-value")
  input.addEventListener("keypress", fSetOnlyNumbers)
  input.addEventListener("input", fRestrictDigits)

  function fSetOnlyNumbers(e) {
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[0-9,.]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  function fRestrictDigits(e) {
    const input = e.target;
    const maxDigits = 9;

    if (input.value.length > maxDigits) {
      input.value = input.value.slice(0, maxDigits);
    }
  }

