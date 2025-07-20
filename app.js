// Get all required DOM elements
let weight = document.querySelector("#weight");
let feet = document.querySelector("#heightFeet");
let inches = document.querySelector("#heightInches");
let result = document.querySelector("#result");
let resetBtn = document.querySelector(".reset");
let calculateBtn = document.querySelector("#calculate");
let form = document.querySelector("#bmiForm");

// Prevent form submission (page reload)
form.addEventListener("submit", function (e) {
    e.preventDefault();
    showResult();
});

// Show BMI result
const showResult = () => {
    let bmi = calculateBMI();

    if (typeof bmi === "string") {
        result.innerHTML = `<h2>${bmi}</h2>`;
    } else {
        let category = getBMICategory(bmi);
        result.innerHTML = `
            <h2>Your BMI is: ${bmi.toFixed(2)}</h2>
            <p style="font-size: 1.1rem; font-weight: bold;">Category: ${category}</p>
        `;
    }

    resetBtn.classList.remove("hide");
};

// Calculate BMI
const calculateBMI = () => {
    let kg = parseFloat(weight.value);
    let ft = parseFloat(feet.value);
    let inch = parseFloat(inches.value);

    if (isNaN(kg) || isNaN(ft) || isNaN(inch)) {
        return "⚠️ Please enter valid numbers!";
    }

    // Convert to meters
    let totalInches = ft * 12 + inch;
    let heightInMeters = totalInches * 0.0254;

    let bmi = kg / (heightInMeters ** 2);
    return bmi;
};

// Categorize BMI
const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight";
    else if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    else return "Obese";
};

// Reset all fields and result
resetBtn.addEventListener("click", () => {
    form.reset();
    result.innerHTML = `<h2>What is BMI ??</h2>`;
    resetBtn.classList.add("hide");
});
