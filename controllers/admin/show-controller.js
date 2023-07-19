import { Services } from "../../services/admin-services.js";

function newCard(id, image, name, price) {
    const cardProduct = document.createElement("div");
    cardProduct.classList.add("products__card");

    const content = `
        <div class="products__card--imagen">
            <img src="${image}" alt="imagen-producto">
            <div class="icons__modify">
                <button data-delete id="${id}">
                    <img src="../../src/images/trash3-fill.svg" alt="icon-delete" class="icon icon__trash">
                </button>
                <a href="./form-edit-product.html?id=${id}">
                    <img src="../../src/images/pencil-fill.svg" alt="icon-edit" class="icon icon__edit">
                </a>
            </div>
        </div>
        <div class="products__card--details">
            <p>${name}</p>
            <p><b class="products__price">$${price}</b></p>
        </div>
    `;
    cardProduct.innerHTML = content;

    const btn = cardProduct.querySelector("[data-delete]");
    btn.addEventListener("click", () => {
        const id = btn.id;
        if (!confirm("Está seguro que desea liminar este elemento?")){
            return
        }
        Services.deleteProduct(id);
        
    });

    return cardProduct;
}

const listProducts = document.querySelector("[data-list]");

async function listarProducts() {
    const products = await Services.listProducts();
    const fragment = document.createDocumentFragment()

    products.forEach(({ id, image, name, price }) => {
        const card = newCard(id, image, name, price);
        fragment.append(card);
    });
    
    listProducts.append(fragment)
}

listarProducts();
 