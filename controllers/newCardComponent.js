export function newCard({ id, image, name, price }) {
    const cardProduct = document.createElement("div");
    cardProduct.classList.add("products__card");

    const content = `
          <div class="products__card--imagen">
             <img src="${image}" alt="imagen-producto">
          </div>
          <div class="products__card--details">
             <p>${name}</p>
             <p><b class="products__price">$${price}</b></p>
             <a href="/aluraEcommerce/pages/details-products.html?id=${id}" class="btn__view">Ver producto</a>
          </div>
    `;

    cardProduct.innerHTML = content;

    return cardProduct;
}
