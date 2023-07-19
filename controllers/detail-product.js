import { Services } from "../services/admin-services.js";
import { newCard } from "./newCardComponent.js";

function createCardDetails({ name, image, category, price, description }) {
    const card = document.createElement("section");
    card.classList.add("details__product");

    const cardHTML = `
            <div class="details__product--image">
                <img src="${image}" alt="product - image" class="image__product">
            </div>
            <div class="details__product--info">
                <h1 class="product__name">${name}</h1>
                <p class="product__price"><b>$ ${price}</b></p>
                <p class="product__description">${description}</p>
            </div>
    `;
    card.innerHTML = cardHTML;

    return card;
}

const details = document.querySelector("[data-details]");
const similarProductsContainer = document.querySelector("[data-similar-products]");

async function appendCardDOM() {
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

        const card = createCardDetails(data);
        details.append(card);

        //Obtener productos similares
        const similarProducts = await Services.listProducts();
        const similarProductsFiltered = similarProducts.filter(
            (product) =>
                product.category === data.category && product.id !== data.id
        );

        let similarProductsCount = 0;
        for (const product of similarProductsFiltered) {
            if (similarProductsCount >= 6) {
                break;
            }
            const similarProduct = newCard(product);
            similarProductsContainer.append(similarProduct);
            similarProductsCount++;
        }
    } catch (error) {
        alert("Error al cargar los detalles del producto: " + error.message);
        window.location.replace("/aluraEcommerce/");
    }
}

appendCardDOM();
