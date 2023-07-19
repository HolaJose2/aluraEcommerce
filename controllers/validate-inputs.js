export function validateInputs() {
    const inputs = document.querySelectorAll(".form__input");

    inputs.forEach((input) => {
        input.addEventListener("blur", () => {
            if (input.value.trim().length === 0) {
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        });
    });
}