import { Services } from "../services/admin-services.js";
import { newCard } from "./newCardComponent.js";

const listProductsStarWars = document.querySelector("[data-list-starwars]");
const listProductsConsolas = document.querySelector("[data-list-consolas]");
const listProductsDiversos = document.querySelector("[data-list-diversos]");

async function listarProducts() {
    const products = await Services.listProducts();
    const fragmentStarWars = document.createDocumentFragment();
    const fragmentConsolas = document.createDocumentFragment();
    const fragmentDiversos = document.createDocumentFragment();

    let countStarWars = 0;
    let countConsolas = 0;
    let countDiversos = 0;

    for (const product of products) {
        const card = newCard(product);

        if (product.category === "Star Wars" && countStarWars < 6) {
            fragmentStarWars.append(card);
            countStarWars++;
        } else if (product.category === "Consolas" && countConsolas < 6) {
            fragmentConsolas.append(card);
            countConsolas++;
        } else if (product.category === "Diversos" && countDiversos < 6) {
            fragmentDiversos.append(card);
            countDiversos++;
        }

        if (countStarWars === 6 && countConsolas === 6 && countDiversos === 6) {
            break;
        }
    }

    listProductsStarWars.append(fragmentStarWars);
    listProductsConsolas.append(fragmentConsolas);
    listProductsDiversos.append(fragmentDiversos);
}

listarProducts();
