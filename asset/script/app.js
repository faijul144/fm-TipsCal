"use strict";

const bill = document.getElementById("bill");
const people = document.getElementById("people");
const tip = document.getElementById("tip");
const total = document.getElementById("total");
const tax = document.querySelectorAll(".form-group__tax-percent--btn-group");

const uncheckRadio = () => {
  tax.forEach((item) => {
    document
      .querySelectorAll(`.${item.classList} [type="radio"]`)
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
  });
};

const checkChoosen = (e) => {
  if (e.target.checked) {
    if (bill.value != "" && people != "") {
      let chosen = e.target.value;
      let tipValue = (bill.value * chosen) / 100 / people.value;
      tip.value = tipValue.toFixed(2);
      let totalValue = bill.value / people.value;
      let totalAmmount = totalValue + tipValue;
      total.value = totalAmmount.toFixed(2);
    }
  }
};

const customChosen = (e) => {
  uncheckRadio();
  tip.value = "$0.00";
  e.target.addEventListener("keyup", (e) => {
    if (bill.value != "" && people != "") {
      let chosen = e.target.value;
      let tipValue = (bill.value * chosen) / 100 / people.value;
      tip.value = tipValue.toFixed(2);
      let totalValue = bill.value / people.value;
      let totalAmmount = totalValue + tipValue;
      total.value = totalAmmount.toFixed(2);
    }
  });
};

const numberValidation = (e) => {
  let newString = e.split("");
  let resultString = [];
  newString.forEach((item) => {
    if (!isNaN(item)) {
      resultString.push(item);
    }
  });
  return resultString.join("");
};

const billAdd = (e) => {
  e.target.value = numberValidation(e.target.value);

  tip.value = `$${numberValidation(e.target.value)}`;
  if (e.target.value == "") {
    total.value = `$0.00`;
    tip.value = `$0.00`;
  }

  if (people.value != 0) {
    let result = e.target.value / people.value;
    total.value = result.toFixed(2);
  }
};

const numberOfPeople = (e) => {
  e.target.value = numberValidation(e.target.value);
  if (tip.value != "$0.00") {
    let result = bill.value / e.target.value;
    total.value = result.toFixed(2);
  }
};

bill.addEventListener("keyup", billAdd);
people.addEventListener("keyup", numberOfPeople);
tax.forEach((item) => {
  document
    .querySelectorAll(`.${item.classList} [type="radio"]`)
    .forEach((checkbox) => {
      checkbox.addEventListener("change", checkChoosen);
    });

  document
    .querySelector(`.${item.classList} [type='text']`)
    .addEventListener("focus", customChosen);
});
