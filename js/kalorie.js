const meals = [];
let mealsNumber;
const mealSelect = document.querySelector(".mealsnumber");
const steps = document.querySelector("#steps");
const ingredientsTableHeaders = [
  "Nazwa",
  "Kalorie",
  "Białko",
  "Tłuszcz",
  "Węglowodany",
  "Akcje"
];
function formGenerate() {
  getNumberOfMeals();
  generateIngredientsInput();
  addSteps();
  initList();
  document.getElementById("summary").style.display = "block";
  document.getElementById("form1").style.display = "block";
  showTab(currentTab);
}

function initList() {
  for (let i = 0; i < mealsNumber; i++) {
    meals.push([]);
  }
}
function getNumberOfMeals() {
  mealsNumber = mealSelect.options[mealSelect.selectedIndex].value;
}

var currentTab = 0; // Current tab is set to be the first tab (0)
// Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 2) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
  showIngredientsInTable();
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function generateMealsOption() {
  for (let i = 0; i < 10; i++) {
    let element = document.createElement("option");
    element.value = i + 1;
    element.text = i + 1;
    mealSelect.appendChild(element);
  }
}
function generateIngredientsInput() {
  const mealsForm = document.querySelector("#regForm");
  for (let i = 0; i < mealsNumber; i++) {
    let ingredientsContainer = document.createElement("div");
    let mealHeader = document.createElement("h4");
    mealHeader.textContent = `Posiłek nr ${i + 1}`;
    let ingredientInput = document.createElement("input");
    ingredientInput.type = "text";
    ingredientInput.placeholder = "Wybierz składnik";
    ingredientInput.id = `search_${i}`;
    let ingredientAddBtn = document.createElement("button");
    ingredientAddBtn.type = "button";
    ingredientAddBtn.textContent = "Dodaj";
    ingredientAddBtn.addEventListener("click", addIngredientToMeal);
    ingredientsContainer.classList.add("tab");
    ingredientsContainer.appendChild(mealHeader);
    ingredientsContainer.appendChild(ingredientInput);
    ingredientsContainer.appendChild(ingredientAddBtn);
    ingredientsContainer.appendChild(generateIngredientsTable(i));
    mealsForm.appendChild(ingredientsContainer);
  }
}

function generateIngredientsTable(n) {
  const listOfMeals = document.createElement("div");
  listOfMeals.classList.add(`listofmeals`, `listofmeals_{$n}`);
  const table100 = document.createElement("div");
  table100.classList.add("table100");
  const table = document.createElement("table");
  table.classList.add("table", "table-striped", `mealTable_${n}`);
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");
  tableRow.classList.add("table100-head");
  for (let i = 0; i < ingredientsTableHeaders.length; i++) {
    const th = document.createElement("th");
    th.textContent = ingredientsTableHeaders[i];
    th.classList.add(`column${i + 1}`);
    tableRow.appendChild(th);
  }
  const tableBody = document.createElement("tbody");

  tableHead.appendChild(tableRow);
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  table100.appendChild(table);
  listOfMeals.appendChild(table100);
  return listOfMeals;
}
function addSteps() {
  for (let i = 0; i <= mealsNumber; i++) {
    let step = document.createElement("span");
    step.classList.add("step");
    steps.appendChild(step);
  }
}

function addIngredientToMeal() {
  let input = document.querySelector(`#search_${currentTab}`);
  const ingredient = {};
  ingredient.name = input.value;
  ingredient.calories = 0;
  ingredient.protein = 0;
  ingredient.fat = 0;
  ingredient.carbohydrates = 0;

  meals[currentTab].push(ingredient);
  console.log(meals);

  showIngredientsInTable();
}

function showIngredientsInTable(n) {
  const tbody = document.querySelector(`.mealTable_${currentTab} tbody`);
  tbody.innerHTML = "";
  const ingredients = meals[currentTab];
  for (let i = 0; i < ingredients.length; i++) {
    let ingredient = ingredients[i];
    const tableRow = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.textContent = ingredient.name;
    const caloriesTd = document.createElement("td");
    caloriesTd.textContent = ingredient.calories;
    const proteinTd = document.createElement("td");
    proteinTd.textContent = ingredient.protein;
    const fatTd = document.createElement("td");
    fatTd.textContent = ingredient.fat;
    const carbohydratesTd = document.createElement("td");
    carbohydratesTd.textContent = ingredient.carbohydrates;
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Usuń";
    removeBtn.classList.add("btn-primary");
    removeBtn.addEventListener("click", () => removeFood(ingredient.name));

    tableRow.appendChild(nameTd);
    tableRow.appendChild(caloriesTd);
    tableRow.appendChild(proteinTd);
    tableRow.appendChild(fatTd);
    tableRow.appendChild(carbohydratesTd);
    tableRow.appendChild(removeBtn);
    tbody.appendChild(tableRow);
  }
}
function removeFood(name) {
  meals[currentTab] = meals[currentTab].filter(el => el.name !== name);
  showIngredientsInTable();
}
generateMealsOption();
