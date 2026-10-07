window.addEventListener('DOMContentLoaded', function () {

  var quantityField = document.getElementById('quantity');
  var serviceRadios = document.getElementsByName('serviceType');
  var optionsBlock = document.getElementById('options-block');
  var optionsSelect = document.getElementById('options');
  var propertyBlock = document.getElementById('property-block');
  var urgentCheckbox = document.getElementById('urgent');
  var resultElement = document.getElementById('result');

  function getPrices() {
    return {
      serviceTypes: {
        '1': 500,
        '2': 700,
        '3': 1200
      },
      options: {
        basic: 0,
        extended: 300,
        premium: 600
      },
      urgent: 400
    };
  }

  function getSelectedServiceType() {
    var i;
    for (i = 0; i < serviceRadios.length; i += 1) {
      if (serviceRadios[i].checked) {
        return serviceRadios[i].value;
      }
    }
    return null;
  }

  function updateVisibility() {
    var serviceType = getSelectedServiceType();

    // Первый тип услуги — без опций и свойств.
    // Второй тип — только опции (селект).
    // Третий тип — только свойство (чекбокс).
    optionsBlock.style.display = (serviceType === '2') ? 'block' : 'none';
    propertyBlock.style.display = (serviceType === '3') ? 'block' : 'none';
  }

  function updatePrice() {
    var prices = getPrices();
    var serviceType = getSelectedServiceType();
    var quantity = parseInt(quantityField.value, 10);
    var price = 0;

    if (!quantity || quantity < 1) {
      quantity = 1;
    }

    if (serviceType !== null) {
      price = prices.serviceTypes[serviceType];
    }

    if (serviceType === '2') {
      price += prices.options[optionsSelect.value] || 0;
    }

    if (serviceType === '3' && urgentCheckbox.checked) {
      price += prices.urgent;
    }

    price *= quantity;

    resultElement.textContent = 'Стоимость услуги: ' + price + ' ₽';
  }

  function recalc() {
    updateVisibility();
    updatePrice();
  }

  quantityField.addEventListener('input', updatePrice);

  serviceRadios.forEach(function (radio) {
    radio.addEventListener('change', recalc);
  });

  optionsSelect.addEventListener('change', updatePrice);
  urgentCheckbox.addEventListener('change', updatePrice);

  recalc();

});
