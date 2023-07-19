import { Services } from "../../services/admin-services.js";
import { validateInputs } from "../validate-inputs.js";

const form = document.querySelector("[data-form]");
const alertError = document.querySelector("[data-error]");
const imageInput = document.querySelector("[data-image]");
const categoryInput = document.querySelector("[data-category]");
const nameInput = document.querySelector("[data-name]");
const priceInput = document.querySelector("[data-price]");
const descriptionInput = document.querySelector("[data-description]");

async function getProductDetails() {
    try {
        const url = new URL(window.location);
        const id = url.searchParams.get("id");

        if (!id || !url) {
            throw new Error(
                "No se encontró el ID del producto o la URL no es válida"
            );
        }

        const data = await Services.detailsProduct(id);

        if (
            !data.id ||
            !data.image ||
            !data.category ||
            !data.name ||
            !data.price ||
            !data.description
        ) {
            throw new Error("El producto no existe");
        }

        return data;
    } catch (error) {
        alert(error);
        window.location.replace("/pages/admin/list-products.html");
    }
}

function displayProductDetails(data) {
    imageInput.value = data.image;
    categoryInput.value = data.category;
    nameInput.value = data.name;
    priceInput.value = data.price;
    descriptionInput.value = data.description;
}

async function submitForm() {
    try {
        const isFormValid =
            document.querySelectorAll(".form__input.error").length === 0;

        if (!isFormValid) {
            alertError.style.display = "block";
            return;
        }

        const url = new URL(window.location);
        const id = url.searchParams.get("id");

        const image = imageInput.value;
        const category = categoryInput.value;
        const name = nameInput.value;
        const price = priceInput.value;
        const description = descriptionInput.value;

        await Services.updateProduct({
            id: id,
            image: image,
            category: category,
            name: name,
            price: price,
            description: description,
        });

        window.location.replace("/pages/admin/list-products.html");
    } catch (error) {
        console.error("Error:", error);
    }
}

async function init() {
    const productDetail = await getProductDetails();
    displayProductDetails(productDetail);
    validateInputs();
    form.addEventListener("submit", submitForm);
}

init();
