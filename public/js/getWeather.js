const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorMessage = document.querySelector("#error");
const resultMessage = document.querySelector("#result");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    errorMessage.textContent = resultMessage.textContent = "";

    fetch(`http://localhost:3000/weather?address=${search.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                resultMessage.textContent = `Current temperature for ${data.location}: ${data.temp} C. Feels like ${data.feelsLike} C.`;
            }
        });
    });
});
