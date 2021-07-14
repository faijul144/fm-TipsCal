"use strict";

const bill = document.getElementById("bill");
const people = document.getElementById("people");
const tip = document.getElementById("tip");
const total = document.getElementById("total");
const tax = document.querySelectorAll(".form-group__tax-percent--btn-group");
const reset = document.getElementById("reset");

if (
  tip.value == "$0.00" ||
  total.value == "$0.00" ||
  bill.value == "" ||
  people.value == ""
) {
  reset.setAttribute("disabled", "true");
}

const resetDisable = () => {
  console.log("work");
  if (bill.value == "" && people.value == "") {
    reset.setAttribute("disabled", "true");
  }
};
const resetAll = (e) => {
  e.preventDefault();
  tip.value = "$0.00";
  total.value = "$0.00";
  bill.value = "";
  people.value = "";
  tax.forEach((item) => {
    document
      .querySelectorAll(`.${item.classList} [type="radio"]`)
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
    document.querySelector(`.${item.classList} [type="text"]`).value = "";
  });
  reset.setAttribute("disabled", "true");
};
const removeCusInput = () => {
  tax.forEach((item) => {
    if (
      document.querySelector(`.${item.classList} [type="text"]`).value != ""
    ) {
      document.querySelector(`.${item.classList} [type="text"]`).value = "";
    }
  });
};

const getCusInput = () => {
  let inputValue;
  tax.forEach((item) => {
    if (
      document.querySelector(`.${item.classList} [type="text"]`).value != ""
    ) {
      inputValue = document.querySelector(
        `.${item.classList} [type="text"]`
      ).value;
    }
  });
  return inputValue;
};

const checkedNewValue = () => {
  let checkedValue;
  tax.forEach((item) => {
    document
      .querySelectorAll(`.${item.classList} [type="radio"]`)
      .forEach((checkbox) => {
        if (checkbox.checked) {
          checkedValue = checkbox.value;
        }
      });
  });

  return checkedValue;
};

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
  removeCusInput();
  if (people.value != 0) {
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
  }
};

const customChosen = (e) => {
  e.target.value = numberValidation(e.target.value);
  uncheckRadio();
  if (people.value != 0) {
    e.target.addEventListener("keyup", (e) => {
      if (bill.value != "" && people != "") {
        let chosen;
        if (e.target.value == "") {
          chosen = 0;
        }
        chosen = e.target.value;
        let tipValue = (bill.value * chosen) / 100 / people.value;
        tip.value = tipValue.toFixed(2);
        let totalValue = bill.value / people.value;
        let totalAmmount = totalValue + tipValue;
        total.value = totalAmmount.toFixed(2);
      }
    });
  }
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
  reset.removeAttribute("disabled");
  e.target.value = numberValidation(e.target.value);
  if (e.target.value == "") {
    total.value = `$0.00`;
    tip.value = `$0.00`;
  }

  if (e.target.value != 0 && people.value != 0) {
    let chosen;

    if (
      (getCusInput() != "" ||
        getCusInput() != undefined ||
        getCusInput() != 0) &&
      (checkedNewValue() == "" ||
        checkedNewValue() == undefined ||
        checkedNewValue() == 0)
    ) {
      chosen = getCusInput();
    } else {
      chosen = checkedNewValue();
    }
    if (chosen == "" || chosen == undefined) {
      chosen = 0;
    }
    let tipValue = (bill.value * chosen) / 100 / people.value;
    tip.value = tipValue.toFixed(2);
    let totalValue = bill.value / people.value;
    let totalAmmount = totalValue + tipValue;
    total.value = totalAmmount.toFixed(2);
  }
  resetDisable();
};

const numberOfPeople = (e) => {
  reset.removeAttribute("disabled");
  if (e.target.value != "") {
    e.target.value = parseInt(numberValidation(e.target.value));
    if (e.target.value != 0) {
      let chosen;
      if (
        (getCusInput() != "" ||
          getCusInput() != undefined ||
          getCusInput() != 0) &&
        (checkedNewValue() == "" ||
          checkedNewValue() == undefined ||
          checkedNewValue() == 0)
      ) {
        chosen = getCusInput();
      } else {
        chosen = checkedNewValue();
      }
      if (chosen == "" || chosen == undefined) {
        chosen = 0;
      }
      let tipValue = (bill.value * chosen) / 100 / people.value;
      tip.value = tipValue.toFixed(2);
      let totalValue = bill.value / people.value;
      let totalAmmount = totalValue + tipValue;
      total.value = totalAmmount.toFixed(2);
      e.target.classList.remove("error");
      document
        .querySelector(`[for = ${e.target.getAttribute("id")}] span`)
        .classList.remove("show");
    } else {
      e.target.classList.add("error");
      document
        .querySelector(`[for = ${e.target.getAttribute("id")}] span`)
        .classList.add("show");
      tip.value = "$0.00";
      total.value = "$0.00";
    }
  }
  resetDisable();
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
    .addEventListener("keyup", customChosen);
});
reset.addEventListener("click", resetAll);
