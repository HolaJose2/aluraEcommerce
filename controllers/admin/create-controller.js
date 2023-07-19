import { Services } from "../../services/admin-services.js";
import { validateInputs } from "../validate-inputs.js";

const form = document.querySelector("[data-form]");
const alertError = document.querySelector("[data-error]");



function getFormValues() {
    const image = document.querySelector("[data-image]").value;
    const category = document.querySelector("[data-category]").value;
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const description = document.querySelector("[data-description]").value;

    return { image, category, name, price, description };
}

function sendForm() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const isFormValid =
            document.querySelectorAll(".form__input.error").length === 0;

        if (!isFormValid) {
            alertError.style.display = "block";
            return; // Detener el envío del formulario si hay campos vacíos
        }

        try {
            const productData = getFormValues();

            const newProduct = await Services.createProduct(productData);

            window.location.replace("/pages/admin/list-products.html");
        } catch (error) {
            console.log("Error:", error);
        }
    });
}

validateInputs();
sendForm();
