const bmiSummary = document.querySelector("#bmisummary");
const bmiValue = document.querySelector("#wskbmi");

const bmiBtn = document.querySelector("#bmiBtn");
console.log("DDDD");

bmiBtn.addEventListener("click", calculateBmi);
function calculateBmi(e) {
  console.log("D");
  e.preventDefault();

  const weight = document.querySelector(".inputweight").value;
  const height = document.querySelector(".inputheight").value;
  console.log(height);
  if (weight == "" || height == "") {
    alert("Uzupełnij poprawnie dane");
  } else {
    const bmi = weight / (height * height);
    bmiValue.textContent = bmi;
    bmiSummary.style.display = "block";
  }
}
