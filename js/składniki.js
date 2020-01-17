function addIngredient() {
  const name = document.querySelector(".inputname").value;
  const calories = document.querySelector(".inputkcl").value;
  const carbohydrates = document.querySelector(".inputweglo").value;
  const protein = document.querySelector(".inputbial").value;
  const fat = document.querySelector(".inputtlu").value;

  const ingred = {
    name,
    calories,
    protein,
    fat,
    carbohydrates
  };
  console.log(ingred);

  fetch("https://blooming-plateau-41206.herokuapp.com/food/", {
    method: "post",
    body: JSON.stringify(ingred),
    mode: "cors",

    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res)
    .then(res => {
      console.log(res);
      clearFields();
    })
    .catch(err => console.error(err));
}
function clearFields() {
  document.querySelector(".inputname").value = "";
  document.querySelector(".inputkcl").value = "";
  document.querySelector(".inputweglo").value = "";
  document.querySelector(".inputbial").value = "";
  document.querySelector(".inputtlu").value = "";
}
document.querySelector(".btn3 button").addEventListener("click", addIngredient);
